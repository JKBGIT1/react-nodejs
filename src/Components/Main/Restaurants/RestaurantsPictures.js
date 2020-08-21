import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import React from "react";
import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export const RestaurantsPictures = (props) => {
    let displayCollection;
    const { context } = props;
    const { screenWidth } = props;
    const numOfCols = screenWidth < 600 ? 1 : 2;
    const height = screenWidth < 1280 ? 250 : 360;

    if (context.clickedSearch) {
        // Pre kazdu restauraciu, ktoru vratil API call zobrazi featured_image, nazov a adresu
        // Ked pouzivatel klikne na obrazok restauracie, tak sa zobrazia jej detaily
        displayCollection = context.restaurantsApi.map((res) => (
            <GridListTile
                id={res.restaurant.id}
                key={res.restaurant.id}
                onClick={() => context.restaurantDetail(res.restaurant.id)}
            >
                <img src={res.restaurant.featured_image} alt={""}/>
                <GridListTileBar
                    title={res.restaurant.name}
                    subtitle={<span>{res.restaurant.location.address}</span>}
                />
            </GridListTile>
        ));
    } else {
        displayCollection = context.logedUser.favoriteRestaurants.map((restaurant) => (
            <GridListTile
                id={restaurant.id}
                key={restaurant.id}
                onClick={() => context.restaurantDetail(restaurant.id)}
            >
                <img src={restaurant.featured_image} alt={""}/>
                <GridListTileBar
                    title={restaurant.name}
                    subtitle={<span>{restaurant.address}</span>}
                />
            </GridListTile>
        ));
    }

    return (
        <GridList cols={numOfCols} cellHeight={height}>
            <GridListTile key="Subheader" cols={numOfCols} style={{ height: 'auto', justify: "space-between" }}>
                <GridListSubheader context={context}/>
            </GridListTile>
            {displayCollection}
            <GridListTile key="BottomSubheader" cols={numOfCols} style={{ height: 'auto', justify: "space-between" }}>
                <GridListSubheader context={context}/>
            </GridListTile>
        </GridList>
    );
}

const GridListSubheader = (props) => {
    const context = props.context;

    return (
        // Tento Subheader sa nachadza na zaciatku aj na konci karty s restauraciami,
        // aby mohol pouzivatel prepinat karty rychlo za sebou alebo ked sa prescrolluje az dole
        <Grid container justify={"space-between"} alignItems={"center"}>
            <Grid item>
                {/* context.cityName je nazov mesta, v ktorom sa mali vyhladat restauracie */}
                {context.clickedSearch ?
                    <ListSubheader component="div">
                        Restaurants in {context.cityName}
                    </ListSubheader> :
                    <ListSubheader component="div">
                        My Favorite
                    </ListSubheader>
                }
            </Grid>
            {/* TREBA SPRAVIT PREPINIE PRE MY FAVORITE */}
            {/* Podla toho, ci je mozne sa prepnut na predoslu alebo nasledujucu kartu s restauraciam sa zobrazia sipky */}
            {context.clickedSearch ?
                <Grid item style={{ paddingLeft: "16px", paddingRight: "16px" }}>
                    {context.lastCityBeginFiltered[context.lastCityBeginFiltered.length - 1] !== 0 ?
                        <IconButton onClick={context.getPreviousRestaurants}>
                            <ChevronLeftIcon/>
                        </IconButton> :
                        null
                    }
                    {context.lastCityFiltered[context.lastCityFiltered.length - 1] < 100 ?
                        <IconButton onClick={context.getNextRestaurants}>
                            <ChevronRightIcon/>
                        </IconButton> :
                        null
                    }
                </Grid> :
                null
            }
        </Grid>
    );
}
