import React, { createContext } from "react";
import { getCity, getRestaurants, getRestaurantDetail } from "../APICalls";

export const Context = createContext(); // Potrebne pre vyuzivanie Context API

class ContextProvider extends React.Component {
    state = {
        screenWidth: window.innerWidth, // componenty budu podla sirky obrazovky v providerovi renderovat rozne elementy
        clickedMyFavorite: false, // ak je pouzivatel prihlaseny, tak si moze zobrazit svoje oblubene restauracie
        clickedSearch: false, // po prvom vyhladani sa uz nikdy nezobrazi uvodna stranka
        clickedEntry: false, // pouzivatel sa chce prihlasit alebo zaregistrovat
        loadingScreen: false, // ak pouzivate taha data zo Zomato API alebo z databazy, tak sa pocas toho zobrazi loading screen
        login: false, // pouzivatel sa chce prihlasit a nie zaregistrovat
        resDetail: null, // vsetky informacie o restauracie z API callu
        searchingCity: null, // sem sa ulozi id vyhladavaneho mesta z API callu
        restaurantsApi: null, // sem ulozim vyhladane restauracie z api
        lastCityBeginFiltered: [], // vdaka tomuto sa viem presunut na predposle kartu s restauraciami
        lastCityFiltered: [], // posledne mesto z desiatich v restaurantsApi, ktore malo featured_image
        inputText: "", // nazov mesta, ktory sa po kliknuti na hladat ikonu bude vyhladavat v Zomato API
        cityName: "", // nazov mesta, ktory bol vyhladany
        logedUser: null, // ak bol pouzivatel uspesne zaregistrovany tak ho prihlasi, alebo sa prihlasi pomocou spravnych udajov sam
    }
    // aby som mal vzdy aktualnu sirku obrazovky, tak musim po nacitani componentu nadstavit tento EventListener
    componentDidMount() {
        window.addEventListener('resize', this.screenWidthChanged);
    }
    // po tom ako sa component prestane zobrazovat, tak odoberiem EventListener
    componentWillUnmount() {
        window.removeEventListener('resize', this.screenWidthChanged);
    }

    // tato funckia zmeni v this.state hodnotu screenWidth, podla aktualnej sirky obrazovky
    screenWidthChanged = () => this.setState({ screenWidth: window.innerWidth });
    // vyhlada sa id mesta, ktoreho nazov sa nachadza v this.state.inputText
    returnRestaurantsWithImg = async (forward) => {
        let lastFilter;
        let onlyWithImage = []; // sem ukladam iba tie restauracie, ktore maju featured_image

        if (forward){ // prepinanie kariet restauracii dopredu v zadanom meste
            lastFilter = this.state.lastCityFiltered[this.state.lastCityFiltered.length - 1]; // ak presiahne 100, tak zomato API mi uz neda results
            this.setState((prevState) => { prevState.lastCityBeginFiltered.push(lastFilter) });
        } else { // prepinanie kariet restauracii dozadu v zadanom meste
            let arr1 = this.state.lastCityBeginFiltered;
            let arr2 = this.state.lastCityFiltered;

            arr1.pop();
            arr2.pop();

            this.setState({
                lastCityBeginFiltered: arr1,
                lastCityFiltered: arr2,
            });

            lastFilter = arr1[arr1.length - 1];
        }

        while (onlyWithImage.length < 10 && lastFilter < 100) { // pokial nemam 10 restauracii, ale sa da vyhladam, tak to vykona
            let result = await getRestaurants(this.state.searchingCity, lastFilter); // dostanem restauracie s featured_image
            lastFilter += 20; // musim zvysit rozsah hladania o 20 ako zomata API filtruje
            // nasledujuci cyklus sa pouziva preto aby som nepresiahol cislo vyhladanych
            for (let i = 0; i < result.length; i++){
                onlyWithImage.push(result[i]);
                if (onlyWithImage.length === 10)
                    break;
            }
        }

        this.setState((prevState) => { prevState.lastCityFiltered.push(lastFilter) });

        return onlyWithImage;
    }

    getRestaurantsByCity = async () => {
        this.setState({ loadingScreen: true }); // zobrazi spinner
        let cityId = await getCity(this.state.inputText); // na zaklade nazvu mesta vo vyhladavani najdem jeho ID v API
        this.setState({ searchingCity: cityId, }); // zmenim hodnotu premenej v stave, pretoze sa podla toho renderuje obsah

        if (cityId) { // ak sa naslo ID mesta, tak vyhladam v API vsetky restauracie, ktore sa v nom nachadzaju a maju featured_image
            this.setState({ lastCityFiltered: [0] });
            const onlyWithImage = await this.returnRestaurantsWithImg(true); // vrati iba restauracie s featured_image
            // ak API call nenajde restauracie s obrazkami, tak stranka zobrazi No Results
            if (onlyWithImage.length === 0)
                this.setState({ restaurantsApi: null });
            else
                this.setState({ restaurantsApi: onlyWithImage });
        } else { // ak sa mesto v API nenachadza, tak musim anulovat tieto veci v stave
            this.setState({
                lastCityBeginFiltered: [],
                lastCityFiltered: [],
                restaurantsApi: null,
            });
        }
        this.setState({
            cityName: this.state.inputText, // nazov mesta, ktory sa zobrazi
            loadingScreen: false, // zobrazi vysledky namiesto spinneru
            // z MyFavorite prepne na vyhladavanie
            clickedMyFavorite: false,
            clickedSearch: true,
            // z prihlasovanie prepne na vyhladavanie
            clickedEntry: false,
            // pouzivatel moze chcet vyhladat restauracie v inom meste, ked su na stranke zobrazene udaje o restauracie z predosleho mesta
            // preto je potrebne zrusit toho zobrazenie a umoznit zobrazenie novych vysledkov
            resDetail: null,
        }); // ak je prve vyhladavanie, tak sa prepne z domovskej stránky

    };
    // ak je mozne, tak sa prepne na nasledujucu kartu s restauraciami v zadanom meste
    getNextRestaurants = async () => {
        this.setState({ loadingScreen: true }); // nasleduje GET Request v ZOMATO API, takze sa zobrazi spinner
        // funkcia vrati udaje o restauraciach, ktore maju featured_image
        const onlyWithImage = await this.returnRestaurantsWithImg(true);
        // ak API call nenajde restauracie s featured_image, tak stranka zobrazi No Results
        if (onlyWithImage.length === 0) // nenasli sa restauracie, ktore maju featured_image
            this.setState({ restaurantsApi: null });
        else
            this.setState({ restaurantsApi: onlyWithImage }); // nasli sa restauracie, ktore maju featured_image

        window.scrollTo({ top: 0, behavior:"smooth" }); // window sa scrollne na vrch
        this.setState({ loadingScreen: false }); // stranka zobrazi vratene udaje o restauraciach namiesto spinnera
    }

    getPreviousRestaurants = async () => {
        this.setState({ loadingScreen: true }); // nasleduje GET Request v ZOMATO API, takze sa zobrazi spinner
        // funkcia vrati udaje o restauraciach, ktore maju featured_image
        const onlyWithImage = await this.returnRestaurantsWithImg(false);
        // ak API call nenajde restauracie s featured_image, tak stranka zobrazi No Results
        if (onlyWithImage.length === 0) // nenasli sa restauracie, ktore maju featured_image
            this.setState({restaurantsApi: null});
        else
            this.setState({restaurantsApi: onlyWithImage}); // nasli sa restauracie, ktore maju featured_image

        window.scrollTo({ top: 0, behavior:"smooth" }); // okno sa zoscrolluje az na vrch
        this.setState({ loadingScreen: false }); // stranka zobrazi udaje o restauranciach namiesto spinnera
    }

    restaurantDetail = async (restaurantId) => {
        this.setState({ loadingScreen: true }); // nasleduje GET Request v ZOMATO API, takze sa zobrazi spinner
        // funkcia vrati detailne udaje o restauracii, ktora sa v ZOMATO API vyhlada podla restaurantId
        const restaurantDetail = await getRestaurantDetail(restaurantId);
        this.setState({ resDetail: restaurantDetail }); // detailne udaje o restauracii ulozi do stavu a potom ich stranka zobrazi
        window.scrollTo({ top: 0, behavior: "smooth" }); // okno sa zoscrolluje az na vrch
        this.setState({ loadingScreen: false }); // prestane sa zobrazovat spinner a namiesto neho sa zobrazia detailne udaje o restauracii
    }
    // ked sa chce zakaznik znova dostat na zobrazenie restauracii, tak sa vykona tato funkcia
    backFromRestaurantDetail = () => this.setState({ resDetail: null });
    // vzdy ked sa zmeni hodnota v inpute pre search, tak sa zmeni hodnota v this.state.inputText
    changeInputText = (event) => this.setState({ inputText: event.target.value });
    // po kliknuti na input pre vyhladvanie sa vymaze jeho predosla hodnota
    deleteText = (event) => event.target.value = "";

    // domovsku alebo vyhladavaciu stranku moze pouzivatel zmenit kliknutim na Login alebo Sign up
    goEntry = (login) => {
        window.scrollTo({ top: 0, behavior: "smooth"}); // window sa zoscrolluje na vrch
        this.setState({
            clickedMyFavorite: false,
            clickedSearch: false,
            restaurantsApi: null,
            searchedCity: null,
            clickedEntry: true,
            resDetail: null,
            inputText: "",
            cityName: "",
            login
        });
    }

    // ak prihlaseny pouzivatel klikne na my favorite, tak sa mu zobrazia jeho oblubene restauracie, ktore si pridal do zoznamu
    goMyFavorite = () => {
        window.scrollTo({ top: 0, behavior: "smooth"}); // window sa zoscrolluje na vrch
        this.setState({
            clickedMyFavorite: true,
            clickedSearch: false,
            restaurantsApi: null,
            clickedEntry: false,
            searchedCity: null,
            resDetail: null,
        });
    }
    // pouzivatel sa odhlasi a zobrazi sa <HomeMain/>
    logout = () => this.setState({
        clickedMyFavorite: false,
        clickedSearch: false,
        clickedEntry: false,
        logedUser: null,
        resDetail: null,
    });

    // Pouzivatel posle svoje user name a password serveru ako query parametre
    // ak boli prihlasovacie udaje sprave, tak ho prihlasi
    tryLogin = async (userName, password) => {
        this.setState({ loadingScreen: true }); // stranka musi cakat na odpoved zo server, preto sa bude zobrazovat spinner
        try {
            // fetch vrati vsetky udaje o prihlasenom pouzivatelovi
            // v pripade, ze user name a password neboli spravne, tak vrati null
            const response = await fetch(`https://react-nodejs-server.herokuapp.com/login?userName=${userName}&password=${password}`);
            const data = await response.json();

            if (data.user) // pouzivatel sa uspesne prihlasil
                this.setState({
                    logedUser: data.user,
                    clickedEntry: false,
                    login: false,
                });
            else { // pouzivatelovi sa nepodarilo prihlasit, pretoze zadal nespravne user name alebo heslo
                this.setState({ logedUser: data.user });
                alert("Incorrect User Name or Password.");
            }
        } catch (error) {
            console.log(error);
        }
        this.setState({ loadingScreen: false }); // server vratil udaje, takze ich stranka moze zobrazit
    }
    // Pouzivate zada prihlasovacie udaje a vykona sa registraciu pomocou POST requestu
    // Ak sa podari pouzivatela zaregistrovat, tak ho system automaticky prihlasi
    trySignUp = async (firstName, lastName, email, userName, password) => {
        this.setState({ loadingScreen: true }); // stranka musi cakat na odpoved zo server, preto sa bude zobrazovat spinner
        try {
            // POST Request na server, aby zaregistroval noveho pouzivatela
            // udaje o pouzivatelovi sa nachadazuje v body
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    userName: userName,
                    password: password
                })
            };
            // fetch vrati udaje o pouzivatelovi, ktoreho stranka nasledne prihlasi
            // ak pouzivatel zadal user name, ktore sa uz pouziva, tak fetch vrati null
            const response = await fetch(`https://react-nodejs-server.herokuapp.com/signup`, requestOptions);
            const data = await response.json();

            if (data.user) // pouzivatel bol uspesne zaregirstovany a bude prihlaseny
                this.setState({
                    logedUser: data.user,
                    clickedEntry: false,
                    login: false,
                });
            else { // pouzivatela sa nepodarilo zaregistrovat, pretoze pouzil user name, ktore sa uz pouziva
                this.setState({ logedUser: data.user });
                alert("User Name already exists.");
            }
        } catch (error) {
            console.log(error);
        }
        this.setState({ loadingScreen: false }); // server vratil udaje, takze ich stranka moze zobrazit
    }

    addToFavorite = async () => {
        const { featured_image, name } = this.state.resDetail;
        const { address } = this.state.resDetail.location;
        const { id } = this.state.resDetail;

        try {
            // vykona sa PUT Request, ktory updatene zoznam pouzivatelovych oblubenych restauracii
            // informacie o restauracie, ktoru chce pouzivatel pridat do oblubenych, sa nachadzaju v body
            // podla userName sa vyhlada zoznam, do ktoreho ma byt restauracia pridana
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName: this.state.logedUser.userName,
                    restaurantDetail: {
                        id,
                        name,
                        address,
                        featured_image,
                    }
                })
            };
            // fetch vrati noveho usera, ktory bude mat uz updatnuty zoznam oblubenych restauracii
            const response = await fetch("https://react-nodejs-server.herokuapp.com/myfavorite", requestOptions);
            const data = await response.json();
            this.setState({
                logedUser: data.user
            });
        } catch (error) {
            console.log(error);
        }
    }

    deleteFromFavorite = async () => {
        try {
            // DELETE Request, ktory vymaze vybranu restauraciu zo zoznamu obluneych restauracii prihlaseneho pouzivatela
            // id restauracii, ktoru chce pouzivatel odobrat zo svojho zoznamu sa nachadza v body
            // podla userName sa vyhlada zoznam, z ktoreho ma byt restauracia odobrana
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName: this.state.logedUser.userName,
                    restaurantId: this.state.resDetail.id,
                })
            }
            // fetch vrati noveho usera, ktory bude mat uz updatnuty zoznam oblubenych restauracii
            const response = await fetch("https://react-nodejs-server.herokuapp.com/myfavorite", requestOptions);
            const data = await response.json();
            this.setState({
                logedUser: data.user
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return(
            <Context.Provider
                value={{...this.state,
                        backFromRestaurantDetail: this.backFromRestaurantDetail,
                        getPreviousRestaurants: this.getPreviousRestaurants,
                        deleteFromFavorite: this.deleteFromFavorite,
                        getNextRestaurants: this.getNextRestaurants,
                        getResByCity: this.getRestaurantsByCity,
                        restaurantDetail: this.restaurantDetail,
                        changeInputText: this.changeInputText,
                        addToFavorite: this.addToFavorite,
                        goMyFavorite: this.goMyFavorite,
                        deleteText: this.deleteText,
                        trySignUp: this.trySignUp,
                        tryLogin: this.tryLogin,
                        goEntry: this.goEntry,
                        logout: this.logout,
                }}> {/* ...this.state preda vsetky udaje do value */}
                {this.props.children} {/* Vsetky elementy, ktore su deti budu mat props z value */}
            </Context.Provider>
        );
    }
}

export default ContextProvider;
