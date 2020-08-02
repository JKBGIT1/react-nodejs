import React, { createContext } from "react";
import {getCity, getRestaurants, getRestaurantDetail} from "../APICalls";

export const Context = createContext(); // Potrebne pre vyuzivanie Context API

class ContextProvider extends React.Component {
    state = {
        screenWidth: window.innerWidth, // componenty budu podla sirky obrazovky v providerovi renderovat rozne elementy
        clickedSearch: false, // po prvom vyhladani sa uz nikdy nezobrazi uvodna stranka
        resDetail: null, // vsetky informacie o restauracie z API callu
        searchingCity: null, // sem sa ulozi id vyhladavaneho mesta z API callu
        restaurantsApi: null, // sem ulozim vyhladane restauracie z api
        lastCityBeginFiltered: [], // vdaka tomuto sa viem presunut na predposle kartu s restauraciami
        lastCityFiltered: [], // posledne mesto z desiatich v restaurantsApi, ktore malo featured_image
        inputText: "", // nazov mesta, ktory sa po kliknuti na hladat ikonu bude vyhladavat v Zomato API
        cityName: "", // nazov mesta, ktory bol vyhladany
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
            lastFilter = this.state.lastCityFiltered[this.state.lastCityFiltered.length - 1]; // ak presiahne 100, tak zomato API mi uz neda results
            this.setState((prevState) => {prevState.lastCityBeginFiltered.push(lastFilter)});
        } else {
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

        this.setState((prevState) => {prevState.lastCityFiltered.push(lastFilter)});

        console.log(onlyWithImage);

        return onlyWithImage;
    }

    getRestaurantsByCity = async () => {
        let cityId = await getCity(this.state.inputText); // na zaklade nazvu mesta vo vyhladavani najdem jeho ID v API
        this.setState({ searchingCity: cityId }); // zmenim hodnotu premenej v stave, pretoze sa podla toho renderuje obsah

        if (cityId) { // ak sa naslo ID mesta, tak vyhladam v API vsetky restauracie, ktore sa v nom nachadzaju
            this.setState({ lastCityFiltered: [0] });
            const onlyWithImage = await this.returnRestaurantsWithImg(true);

            if (onlyWithImage.length === 0)
                this.setState({restaurantsApi: null});
            else
                this.setState({restaurantsApi: onlyWithImage});
        } else {
            this.setState({ lastCityBeginFiltered: [] });
            this.setState({ restaurantsApi: null });
            this.setState({ lastCityFiltered: [] });
        }

        this.setState({ cityName: this.state.inputText });
        this.setState({ clickedSearch: true });
    };

    getNextRestaurants = async () => {
        const onlyWithImage = await this.returnRestaurantsWithImg(true);
        if (onlyWithImage.length === 0)
            this.setState({restaurantsApi: null});
        else
            this.setState({restaurantsApi: onlyWithImage});
    }

    getPreviousRestaurants = async () => {
        const onlyWithImage = await this.returnRestaurantsWithImg(false);
        if (onlyWithImage.length === 0)
            this.setState({restaurantsApi: null});
        else
            this.setState({restaurantsApi: onlyWithImage});
    }

    restaurantDetail = async (restaurantId) => {
        const restaurantDetail = await getRestaurantDetail(restaurantId);
        this.setState({resDetail: restaurantDetail});
        console.log(restaurantDetail);
    }
    // ked sa chce zakaznik znova dostat na zobrazenie restauracii, tak sa vykona tato funkcia
    backFromRestaurantDetail = () => this.setState({resDetail: null});
    // vzdy ked sa zmeni hodnota v inpute pre search, tak sa zmeni hodnota v this.state.inputText
    changeInputText = (event) => this.setState({inputText: event.target.value});
    // po kliknuti na input pre vyhladvanie sa vymaze jeho predosla hodnota
    deleteText = (event) => event.target.value = "";

    render() {
        return(
            <Context.Provider
                value={{...this.state,
                        backFromRestaurantDetail: this.backFromRestaurantDetail,
                        getPreviousRestaurants: this.getPreviousRestaurants,
                        getNextRestaurants: this.getNextRestaurants,
                        getResByCity: this.getRestaurantsByCity,
                        restaurantDetail: this.restaurantDetail,
                        changeInputText: this.changeInputText,
                        deleteText: this.deleteText
                }}> {/* ...this.state preda vsetky udaje do value */}
                {this.props.children} {/* Vsetky elementy, ktore su deti budu mat props z value */}
            </Context.Provider>
        );
    }
}

export default ContextProvider;
