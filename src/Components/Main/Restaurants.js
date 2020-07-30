import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridList from "@material-ui/core/GridList";

class Restaurants extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const context = this.props.context;

        return (
            <GridList cellHeight={360}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Restaurants in {context.inputText}</ListSubheader>
                </GridListTile>
                {context.restaurantsApi.map((res) => (
                    <GridListTile key={res.restaurant.id} onClick={() => context.restaurantDetail(res.restaurant.id)}>
                        <img src={res.restaurant.featured_image} alt={""}/>
                        <GridListTileBar
                            title={res.name}
                            subtitle={<span>{res.restaurant.location.address}</span>}
                        />
                    </GridListTile>
                ))}
            </GridList>
        );
    }
}

export default Restaurants;
