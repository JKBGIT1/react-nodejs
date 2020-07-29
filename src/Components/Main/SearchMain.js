import React from "react";
import Grid from "@material-ui/core/Grid";
import {Context} from "../../Contexts/Context";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";

class SearchMain extends React.Component {
    state = {
        styles: {
            noResults: {
                margin: "2%",
                marginTop: "75px",
            }
        }
    }

    render() {
        return (
            <Context.Consumer>{(context) => {
                return (
                    <Grid container style={{marginTop: "75px"}}>
                        <Grid item md={2}>
                            <Paper>
                                {context.categoriesApi.map((categorie) => (
                                    <Typography>{categorie.categories.name}</Typography>
                                ))}
                            </Paper>
                        </Grid>
                        <Grid item container md={10}>
                            <GridList cellHeight={360}>
                                <GridListTile key="Subheader" cols={2} style={{ height: 'auto', backgroundColor: "darkgrey" }}>
                                    <ListSubheader component="div">Restaurants in {context.inputText}</ListSubheader>
                                </GridListTile>
                                {context.restaurantsApi.restaurants.map((res) => (
                                    <GridListTile key={res.restaurant.id}>
                                        <img src={res.restaurant.featured_image} alt={"Restaurant Image"} />
                                        <GridListTileBar
                                            title={res.restaurant.name}
                                            subtitle={<p>
                                                        City: {res.restaurant.location.city}
                                                        Locality: {res.restaurant.location.locality}
                                                        Address: {res.restaurant.location.address}
                                                      </p>
                                            }
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>
                    </Grid>
                );
            }}
            </Context.Consumer>
        );
    }
}

export default SearchMain;
