import React, { createContext } from "react";
import {getCity} from "../APICalls";

export const Context = createContext(); // Potrebne pre vyuzivanie Context API

class ContextProvider extends React.Component {
    state = {
        screenWidth: window.innerWidth, // componenty budu podla sirky obrazovky v providerovi renderovat rozne elementy
        searchingCity: null, // sem sa ulozi id adresa vyhladavaneho mesta z API callu
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
    getRestaurantsByCity = () => getCity(this.state.inputText);
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
