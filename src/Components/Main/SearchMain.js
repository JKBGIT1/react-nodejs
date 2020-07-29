import React from "react";
import Grid from "@material-ui/core/Grid";
import {Context} from "../../Contexts/Context";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import NoImage from "../../Images/no_image.jpg"

class SearchMain extends React.Component {
    state = {
        styles: {
            noResults: {
                margin: "2%",
                marginTop: "75px",
            },
            noImage: {
                backgroundImg: `url(${NoImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }
        }
    }

    render() {
        return (
            <Context.Consumer>{(context) => {
                return (
                    <Grid container style={{marginTop: "75px"}}>
                        <Grid item md={2}>
                            <Card>
                                <CardHeader subheader="Categories"/>
                                <List dense component="div" role="list">
                                    {context.categoriesApi.map((categorie) => (
                                        <ListItem key={categorie.categories.id} role="listitem" button>
                                            <ListItemIcon>
                                                <Checkbox
                                                    checked={false}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={categorie.categories.id} primary={categorie.categories.name} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Card>
                        </Grid>
                        <Grid item container md={10}>
                            <Card>
                            <GridList cellHeight={360}>
                                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                                    <ListSubheader component="div">Restaurants in {context.inputText}</ListSubheader>
                                </GridListTile>
                                {context.restaurantsApi.restaurants.map((res) => (
                                    <GridListTile key={res.restaurant.id}>
                                        <img
                                            style={this.state.styles.noImage}
                                            src={res.restaurant.featured_image}
                                            alt={""}
                                        />
                                        <GridListTileBar
                                            title={res.restaurant.name}
                                            subtitle={<span>{res.restaurant.location.address}</span>}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                            </Card>
                        </Grid>
                    </Grid>
                );
            }}
            </Context.Consumer>
        );
    }
}

export default SearchMain;
