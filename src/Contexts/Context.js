import React, { createContext } from "react";
import {getCity, getRestaurants, getRestaurantDetail} from "../APICalls";

export const Context = createContext(); // Potrebne pre vyuzivanie Context API

class ContextProvider extends React.Component {
    state = {
        screenWidth: window.innerWidth, // componenty budu podla sirky obrazovky v providerovi renderovat rozne elementy
        canBack: false, // ak je true, tak sa da prepnut na predoslu kartu s restauraciami
        clickedSearch: false, // po prvom vyhladani sa uz nikdy nezobrazi uvodna stranka
        resDetail: null, // vsetky informacie o restauracie z API callu
        searchingCity: null, // sem sa ulozi id vyhladavaneho mesta z API callu
        restaurantsApi: null, // sem ulozim vyhladane restauracie z api
        lastCityBeginFiltered: 0, // vdaka tomuto sa viem presunut na predposle kartu s restauraciami
        lastCityFiltered: 0, // posledne mesto z desiatich v restaurantsApi, ktore malo featured_image
        inputText: "", // nazov mesta, ktory sa po kliknuti na hladat ikonu bude vyhladavat v Zomato API
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
    screenWidthChanged = () => this.setState({screenWidth: window.innerWidth});
    // vyhlada sa id mesta, ktoreho nazov sa nachadza v this.state.inputText
    returnRestaurantsWithImg = async (forward) => {
        let lastFilter;
        let onlyWithImage = []; // sem ukladam iba tie restauracie, ktore maju featured_image

        if (forward){
            lastFilter = this.state.lastCityFiltered; // ak presiahne 100, tak zomato API mi uz neda results
            this.setState({ lastCityBeginFiltered: lastFilter });
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

        this.setState({lastCityFiltered: lastFilter});

        return onlyWithImage;
    }

    getRestaurantsByCity = async () => {
        let cityId = await getCity(this.state.inputText); // na zaklade nazvu mesta vo vyhladavani najdem jeho ID v API
        this.setState({ searchingCity: cityId }); // zmenim hodnotu premenej v stave, pretoze sa podla toho renderuje obsah

        /*
        ** Treba upravit, zobrazovania, ak nenajde vysledky v prvych 100 restauraciach a umoznit lustrovanie stranok iba ked je lastFilter < 100
        */
        if (cityId) { // ak sa naslo ID mesta, tak vyhladam v API vsetky restauracie, ktore sa v nom nachadzaju
            this.setState({ lastCityFiltered: 0 });
            const onlyWithImage = await this.returnRestaurantsWithImg(true);
            if (onlyWithImage.length === 0)
                this.setState({restaurantsApi: null});
            else
                this.setState({restaurantsApi: onlyWithImage});
            console.log(this.state.restaurantsApi);
        } else {
            this.setState({ lastCityBeginFiltered: 0 });
            this.setState({ restaurantsApi: null });
            this.setState({ lastCityFiltered: 0 });
        }
        this.setState({clickedSearch: true});
    };

    getNextRestaurants = async () => {
        const onlyWithImage = await this.returnRestaurantsWithImg(true);
        if (onlyWithImage.length === 0)
            this.setState({restaurantsApi: null});
        else
            this.setState({restaurantsApi: onlyWithImage});

        this.setState({ canBack: true });
    }

    getPreviousRestaurants = async () => {
        const onlyWithImage = await this.returnRestaurantsWithImg(false);
        if (onlyWithImage.length === 0)
            this.setState({restaurantsApi: null});
        else
            this.setState({restaurantsApi: onlyWithImage});

        this.setState({ canBack: true });
    }

    restaurantDetail = async (restaurantId) => {
        const restaurantDetail = await getRestaurantDetail(restaurantId);
        this.setState({resDetail: restaurantDetail})
        console.log(restaurantDetail);
    }
    // ked sa chce zakaznik znova dostat na zobrazenie restauracii, tak sa vykona tato funkcia
    backFromRestaurantDetail = () => this.setState({resDetail: null});
    // vzdy ked sa zmeni hodnota v inpute pre search, tak sa zmeni hodnota v this.state.inputText
    changeInputText = (event) => this.setState({inputText: event.target.value});

    render() {
        return(
            <Context.Provider
                value={{...this.state,
                        backFromRestaurantDetail: this.backFromRestaurantDetail,
                        getNextRestaurants: this.getNextRestaurants,
                        getResByCity: this.getRestaurantsByCity,
                        restaurantDetail: this.restaurantDetail,
                        changeInputText: this.changeInputText,}}> {/* ...this.state preda vsetky udaje do value */}
                {this.props.children} {/* Vsetky elementy, ktore su deti budu mat props z value */}
            </Context.Provider>
        );
    }
}

export default ContextProvider;
