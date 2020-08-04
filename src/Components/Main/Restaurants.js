import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridList from "@material-ui/core/GridList";
import Card from "@material-ui/core/Card";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from "@material-ui/core/Typography";

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

const RestaurantsPictures = (props) => {
    const context = props.context;
    const screenWidth = props.context.screenWidth;
    const numOfCols = screenWidth < 600 ? 1 : 2;
    const height = screenWidth < 1280 ? 250 : 360;

    return (
        <GridList cols={numOfCols} cellHeight={height}>
            <GridListTile key="Subheader" cols={numOfCols} style={{ height: 'auto', justify: "space-between" }}>
                <GridListSubheader context={context}/>
            </GridListTile>
            {/* Pre kazdu restauraciu, ktoru vratil API call zobrazi featured_image, nazov a adresu
                Ked pouzivatel klikne na obrazok restauracie, tak sa zobrazia jej detaily */}
            {context.restaurantsApi.map((res) => (
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
            ))}
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
                <ListSubheader component="div">
                    Restaurants in {context.cityName}
                </ListSubheader>
            </Grid>
            {/* Podla toho, ci je mozne sa prepnut na predoslu alebo nasledujucu kartu s restauraciam sa zobrazia sipky */}
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
            </Grid>
        </Grid>
    );
}

const NoRestaurantResults = (props) => {
    const context = props.context;

    return (
        // nenasli sa vysledky, takze sa zobrazi No Results
        // ak sa predtym restauracie nasli, ale uz dalsie niesu, tak ma pouzivatel moznost prepnut na predoslu kartu s restauraciami
        <Grid container direction={"column"}>
            <Grid item container justify={"space-between"}>
                <Grid item>
                    <ListSubheader component="div">Restaurants in {context.cityName}</ListSubheader>
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

export default Restaurants;
