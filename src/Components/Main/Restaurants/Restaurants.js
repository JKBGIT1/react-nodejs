import React from "react";
import Card from "@material-ui/core/Card";
import Fade from "@material-ui/core/Fade";
import {RestaurantsPictures} from "./RestaurantsPictures";
import {NoRestaurantResults} from "./NoRestaurantResults";

class Restaurants extends React.Component {
    constructor(props) {
        super(props);
    }

    // Tato classa sa vyrenderuje bud ked chce prihlaseny pouzivatel zobrazit jeho oblubene restauracie
    // Alebo chce vyhladat restauracie podla zadaneho mesta
    render() {
        const { context } = this.props;

        return (
            <Fade in={true} timeout={1000}>
                <Card style={{ margin: "0 8px 0 8px" }}>
                    {/* context.restaurantsApi caka na vysledok GET requestu, az potom sa prepne scena */}
                    {context.clickedSearch ?
                        context.restaurantsApi ?
                            <RestaurantsPictures context={context}/> :
                            <NoRestaurantResults context={context}/> :
                        context.logedUser && context.logedUser.favoriteRestaurants.length !== 0 ?
                            <RestaurantsPictures context={context}/> :
                            <NoRestaurantResults context={context}/>
                    }
                </Card>
            </Fade>
        );
    }
}

export default Restaurants;
