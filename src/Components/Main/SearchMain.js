import React from "react";
import Grid from "@material-ui/core/Grid";
import { Context } from "../../Contexts/Context";
import Restaurants from "./Restaurants/Restaurants";
import RestaurantDetail from "./Restaurants/RestaurantDetail";

class SearchMain extends React.Component {
    render() {
        return (
            <Context.Consumer>{(context) => {
                const margin = context.screenWidth < 600 ? "65px" : "75px";

                return (
                    <Grid
                        container
                        justify={"center"}
                        direction={"column"}
                        alignItems={"center"}
                        style={{margin: `${margin} 0 ${margin} 0`}}
                    >
                        <Grid item md={10} style={{ width: "100%" }}>
                            {context.resDetail ? <RestaurantDetail context={context}/> : <Restaurants context={context}/>}
                        </Grid>
                    </Grid>
                );
            }}</Context.Consumer>
        );
    }
}

export default SearchMain;
