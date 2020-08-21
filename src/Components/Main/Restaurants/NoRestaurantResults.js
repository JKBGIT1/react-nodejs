import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {Grid, Typography, IconButton, ListSubheader } from "@material-ui/core";

export const NoRestaurantResults = (props) => {
    const context = props.context;

    return (
        <Grid container direction={"column"}>
            <Grid item container justify={"space-between"}>
                <Grid item>
                    {context.clickedSearch ?
                        <ListSubheader component="div">
                            Restaurants in {context.cityName}
                        </ListSubheader> :
                        <ListSubheader component="div">
                            My Favorite
                        </ListSubheader>
                    }
                </Grid>
                {/*
                Ak bude no results pre logedUser.favoriteRestaurants, tak sa neda posunut ani na predoslu ani na nasledujucu kartu
                V pre restauracie, ktore sa vyhladavaju podla mesta je mozne, ze sa v pripade posledneho mozneho GET requestu
                nenajde ani jedna restauracia s featuredImage, tym padom sa zobrazi result, ale je potrebne aby tam ostala sipka,
                ktorou sa pouzivatel moze vratit na predoslu kartu restauracii
                 */}
                {context.clickedSearch ?
                    <Grid>
                        {context.lastCityBeginFiltered[context.lastCityBeginFiltered.length - 1] !== 0 &&
                        context.lastCityBeginFiltered.length !== 0 ?
                            <IconButton>
                                <ChevronLeftIcon/>
                            </IconButton> :
                            null
                        }
                    </Grid> :
                    null
                }
            </Grid>
            <Grid item>
                <Typography variant={"h5"} style={{ padding: "0 16px 16px 16px"}}>No results</Typography>
            </Grid>
        </Grid>
    );
}
