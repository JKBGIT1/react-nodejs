import React, { createContext } from "react";
import {getCity, getRestaurants, getCategories} from "../APICalls";

export const Context = createContext(); // Potrebne pre vyuzivanie Context API

class ContextProvider extends React.Component {
    state = {
        screenWidth: window.innerWidth, // componenty budu podla sirky obrazovky v providerovi renderovat rozne elementy
        searchingCity: null, // sem sa ulozi id vyhladavaneho mesta z API callu
        restaurantsApi: null, // sem ulozim vyhladane restauracie z api
        categoriesApi: null, // sem ulozim vsetky kategorie jedal, ktore mozu poskytovat restuaracie
        lastCityFiltered: 0, // posledne mesto z desiatich v restaurantsApi, ktore malo featured_image
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
        this.setState({searchingCity: cityId}); // zmenim hodnotu premenej v stave, pretoze sa podla toho renderuje obsah

        /*
        ** Treba upravit, zobrazovania, ak nenajde vysledky v prvych 100 restauraciach a umoznit lustrovanie stranok iba ked je lastFilter < 100
        ** Taktiez treba zrusit zobrazovanie kategorii a nahradit niecim inym, alebo nechat tak a radsej spravit zobrazenie detailov pre restauraciu
        */
        if (cityId) { // ak sa naslo ID mesta, tak vyhladam v API vsetky restauracie, ktore sa v nom nachadzaju
            let lastFilter = 0; // ak presiahne 100, tak zomato API mi uz neda results
            let onlyWithImage = []; // sem ukladam iba tie restauracie, ktore maju featured_image
            while (onlyWithImage.length < 10 && lastFilter < 100) { // pokial nemam 10 restauracii, ale sa da vyhladam, tak to vykona
                let result = await getRestaurants(cityId, lastFilter); // dostanem restauracie s featured_image
                lastFilter += 20; // musim zvysit rozsah hladania o 20 ako zomata API filtruje
                // nasledujuci cyklus sa pouziva preto aby som nepresiahol cislo vyhladanych
                for (let i = 0; i < result.length; i++){
                    onlyWithImage.push(result[i]);
                    if (onlyWithImage.length === 10)
                        break;
                    lastFilter--; // odcitam, pretoze sa nasla restauracia s featured_image
                }
                this.setState({lastCityFiltered: lastFilter});
            }
            // this.setState({restaurantsApi: result}); // vyhladavanie restauracii ulozim do stavu, pretoze s nimi budem dalej pracovat
            this.setState({restaurantsApi: onlyWithImage});
            console.log(this.state.restaurantsApi);
        } else
            alert("No results.");
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
