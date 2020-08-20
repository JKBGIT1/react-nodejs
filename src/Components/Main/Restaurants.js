import React from "react";
import Card from "@material-ui/core/Card";
import Fade from "@material-ui/core/Fade";
import {RestaurantsPictures} from "./RestaurantsResults/RestaurantsPictures";
import {NoRestaurantResults} from "./RestaurantsResults/NoRestaurantResults";

class Restaurants extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const context = this.props.context;

        return (
            <Fade in={true} timeout={1000}>
                <Card style={{ margin: "0 8px 0 8px" }}>
                    {/* Ak sa restauracie v zadanom meste nenachadzaju, tak zobrazi NoRestaurantResults
                        Inak zobrazi prehlad restauracii s ich featured image */}
                    {context.restaurantsApi ?
                        <RestaurantsPictures context={context}/> :
                        <NoRestaurantResults context={context}/>
                    }
                </Card>
            </Fade>
        );
    }
}

export default Restaurants;
