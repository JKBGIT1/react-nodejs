import React from "react";
import Card from "@material-ui/core/Card";
import Fade from "@material-ui/core/Fade";
import {Context} from "../../Contexts/Context";
import {RestaurantsPictures} from "./RestaurantsResults/RestaurantsPictures";
import {NoRestaurantResults} from "./RestaurantsResults/NoRestaurantResults";
import Grid from "@material-ui/core/Grid";

class MyFavorite extends React.Component {
    render() {
        return (
            <Context.Consumer>{(context) => {
                const margin = context.screenWidth < 600 ? "65px" : "75px";

                return(
                    <Grid
                        container
                        justify={"center"}
                        direction={"column"}
                        alignItems={"center"}
                        style={{margin: `${margin} 0 ${margin} 0`}}
                    >
                        <Grid item md={10} style={{ width: "100%" }}>
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
                        </Grid>
                    </Grid>
                );
            }}</Context.Consumer>
        );
    }
}

export default MyFavorite;
