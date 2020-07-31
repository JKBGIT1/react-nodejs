import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridList from "@material-ui/core/GridList";
import Card from "@material-ui/core/Card";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";

class Restaurants extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const context = this.props.context;

        return (
            <Fade in={true} timeout={1000}>
                <Card>
                    {context.restaurantsApi ? <RestaurantsPictures context={context}/> : <NoRestaurantResults context={context}/>}
                </Card>
            </Fade>
        );
    }
}

const RestaurantsPictures = (props) => {
    const context = props.context;

    return (
        <GridList cellHeight={360}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">Restaurants in {context.inputText}</ListSubheader>
            </GridListTile>
            {/* Pre kazdu restauraciu, ktoru vratil API call zobrazi featured_image, nazov a adresu */}
            {context.restaurantsApi.map((res) => (
                <GridListTile key={res.restaurant.id} onClick={() => context.restaurantDetail(res.restaurant.id)}>
                    <img src={res.restaurant.featured_image} alt={""}/>
                    <GridListTileBar
                        title={res.restaurant.name}
                        subtitle={<span>{res.restaurant.location.address}</span>}
                    />
                </GridListTile>
            ))}
        </GridList>
    );
}

const NoRestaurantResults = (props) => {
    const context = props.context;

    return (
        <GridList cellHeight={360}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">Restaurants in {context.inputText}</ListSubheader>
            </GridListTile>
            <GridListTile key={"Subheader"} cols={2} styl={{ height: 'auto' }}>
                <ListSubheader component="div">No Results</ListSubheader>
            </GridListTile>
        </GridList>
    );
}

export default Restaurants;
