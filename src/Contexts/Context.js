import React, { createContext } from "react";
import {getCity, getRestaurants, getCategories} from "../APICalls";

export const Context = createContext(); // Potrebne pre vyuzivanie Context API

class ContextProvider extends React.Component {
    state = {
        screenWidth: window.innerWidth, // componenty budu podla sirky obrazovky v providerovi renderovat rozne elementy
        clickedSearch: false,
        searchingCity: null, // sem sa ulozi id adresa vyhladavaneho mesta z API callu
        restaurantsApi: null, // sem ulozim vyhladane restauracie z api
        categoriesApi: null, // sem ulozim vsetky kategorie jedal, ktore mozu poskytovat restuaracie
        inputText: "", // nazov mesta, ktory sa po kliknuti na hladat ikonu bude vyhladavat v Zomato API
    }
    // aby som mal vzdy aktualnu sirku obrazovky, tak musim po nacitani componentu nadstavit tento EventListener
    async componentDidMount() {
        window.addEventListener('resize', this.screenWidthChanged);
        const categories = await getCategories(); // zo Zomato API nataham vsetky kategorie jedal, ktore mozu mat restauracie
        this.setState({categoriesApi: categories}); // ulozim GET call z API do stavu, aby som s nim mohol dalej pracovat
    }
    // po tom ako sa component prestane zobrazovat, tak odoberiem EventListener
    componentWillUnmount() {
        window.removeEventListener('resize', this.screenWidthChanged);
    }
    // tato funckia zmeni v this.state hodnotu screenWidth, podla aktualnej sirky obrazovky
    screenWidthChanged = () => this.setState({screenWidth: window.innerWidth});
    // vyhlada sa id mesta, ktoreho nazov sa nachadza v this.state.inputText
    getRestaurantsByCity = async () => {
        let cityId = await getCity(this.state.inputText); // na zaklade nazvu mesta vo vyhladavani najdem jeho ID v API

        if (cityId) { // ak sa naslo ID mesta, tak vyhladam v API vsetky restauracie, ktore sa v nom nachadzaju
            let result = await getRestaurants(cityId);
            this.setState({restaurantsApi: result}); // vyhladavanie restauracii ulozim do stavu, pretoze s nimi budem dalej pracovat
            result.restaurants.map(restaurant => console.log(restaurant.restaurant)); // sluzi aktualne iba na kontrolu
        } else
            alert("Udaje o tomto meste nie su dostupne.");

        this.setState({clickedSearch: true});
    };
    // vzdy ked sa zmeni hodnota v inpute pre search, tak sa zmeni hodnota v this.state.inputText
    changeInputText = (event) => this.setState({inputText: event.target.value});

    render() {
        return(
            <Context.Provider
                value={{...this.state,
                        getResByCity: this.getRestaurantsByCity,
                        changeInputText: this.changeInputText,}}> {/* ...this.state preda vsetky udaje do value */}
                {this.props.children} {/* Vsetky elementy, ktore su deti budu mat props z value */}
            </Context.Provider>
        );
    }
}

export default ContextProvider;
