import React from "react";
import Grid from "@material-ui/core/Grid";
import {Context} from "../../Contexts/Context";
import Card from "@material-ui/core/Card";
import Restaurants from "./Restaurants";
import RestaurantDetail from "./RestaurantDetail";

class SearchMain extends React.Component {
    render() {
        return (
            <Context.Consumer>{(context) => (
                <Grid container direction={"column"} justify={"center"} alignItems={"center"} style={{marginTop: "75px"}}>
                    <Grid item md={10}>
                        <Card>
                            {context.resDetail ? <RestaurantDetail context={context}/> :
                                <Restaurants context={context}/>}
                        </Card>
                    </Grid>
                </Grid>)
            }
            </Context.Consumer>
        );
    }
}

export default SearchMain;
