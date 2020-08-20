import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography";
import React from "react";

export const NoRestaurantResults = (props) => {
    const context = props.context;

    return (
        // nenasli sa vysledky, takze sa zobrazi No Results
        // ak sa predtym restauracie nasli, ale uz dalsie niesu, tak ma pouzivatel moznost prepnut na predoslu kartu s restauraciami
        <Grid container direction={"column"}>
            <Grid item container justify={"space-between"}>
                <Grid item>
                    {context.clickedMyFavorite ?
                        <ListSubheader component="div">
                            My Favorite
                        </ListSubheader> :
                        <ListSubheader component="div">
                            Restaurants in {context.cityName}
                        </ListSubheader>
                    }
                </Grid>
                <Grid>
                    {context.lastCityBeginFiltered[context.lastCityBeginFiltered.length - 1] !== 0 &&
                    context.lastCityBeginFiltered.length !== 0 ?
                        <IconButton>
                            <ChevronLeftIcon/>
                        </IconButton> :
                        null
                    }
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant={"h5"} style={{ padding: "0 16px 16px 16px"}}>No results</Typography>
            </Grid>
        </Grid>
    );
}
