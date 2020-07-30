import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

/*
** Velice odporna classa, treba ju zjednodusit, Back button treba dat na pravy koniec
** Dorobit onClick pre buttony a CardActionArea
 */

class RestaurantDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const context = this.props.context;
        const restaurant = context.resDetail;

        return (
            <Card>
                <CardActions>
                    <Button size="medium">
                        Menu
                    </Button>
                    <Button size="medium">
                        Photos
                    </Button>
                    <Button size="medium">
                        Events
                    </Button>
                    <Button onClick={() => context.backFromRestaurantDetail()}>
                        Back
                    </Button>
                </CardActions>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={restaurant.featured_image}
                        title={restaurant.name}
                        onClick={() => console.log(restaurant.url)}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {restaurant.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" component="p">
                            <b>Rating:</b> {restaurant.user_rating.aggregate_rating}, {restaurant.user_rating.rating_text}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" component="p">
                            <b>Timings:</b> {restaurant.timings}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" component="p">
                            <b>Phone Number:</b> {restaurant.phone_numbers}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" component="p">
                            <b>Address:</b> {restaurant.location.address}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" component="p">
                            <b>Cuisines:</b> {restaurant.cuisines}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" component="p">
                            <b>Highlights:</b> {restaurant.highlights.map((highlight) => highlight += ", ")}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

export default RestaurantDetail
