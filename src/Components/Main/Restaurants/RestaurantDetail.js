import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';

class RestaurantDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const context = this.props.context;
        const restaurant = context.resDetail;

        return (
            <Fade in={true} timeout={1000}>
                <Card style={{ margin: "0 8px 0 8px" }}>
                    <RestaurantActions context={context} restaurant={restaurant}/>
                    <CardActionArea>
                        {/* Zobrazi featured_image pre restauraciu a po kliknuti presmeruje pouzivatela na Zomato stranku restauracie */}
                        <CardMedia
                            component="img"
                            image={restaurant.featured_image}
                            title={restaurant.name}
                            onClick={() => window.open(restaurant.url, "_self")}
                        />
                    </CardActionArea>
                    <RestaurantContext restaurant={restaurant}/>
                </Card>
            </Fade>
        );
    }
}

const RestaurantActions = (props) => {
    const btnSize = props.context.screenWidth < 960 ? "small" : "medium";

    return (
        // ked sa klikne na ktorykolvek button, okrem Back, tak stranka presmeruje pouzivatela na denne menu, fotky alebo eventy restauracie
        <CardActions>
            <Button
                size={btnSize}
                onClick={() => window.open(props.restaurant.menu_url, "_self")}
            >
                Menu
            </Button>
            <Button
                size={btnSize}
                onClick={() => window.open(props.restaurant.photos_url, "_self")}
            >
                Photos
            </Button>
            <Button
                size={btnSize}
                onClick={() => window.open(props.restaurant.events_url, "_self")}
            >
                Events
            </Button>
            <div style={{ flexGrow: 1 }}/>
            {/* Ak je pouzivatel prihlaseny, si tuto restauraciu moze pridat do svojich oblubenych */}
            {props.context.logedUser ?
                <IconButton size={btnSize} onClick={props.context.addToFavorite}>
                    <StarBorderIcon/>
                </IconButton> :
                null
            }
            {/* Vrati pouzivatela spat na prehlad restauracii, ktore boli vyhladane */}
            <Button
                size={btnSize}
                onClick={() => props.context.backFromRestaurantDetail()}
            >
                Back
            </Button>
        </CardActions>
    );
}

const RestaurantContext = (props) => {
    return (
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {props.restaurant.name} {/* Nadpis bude nazov kliknutej restauracie */}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" component="p">
                {/* Vypise sa hodnotenie restauracie od 0 do 5 a tiez slovne */}
                <b>Rating:</b> {props.restaurant.user_rating.aggregate_rating}, {props.restaurant.user_rating.rating_text}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" component="p">
                {/* Otvaracie hodiny */}
                <b>Timings:</b> {props.restaurant.timings}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" component="p">
                {/* Cislom na restauraciu */}
                <b>Phone Number:</b> {props.restaurant.phone_numbers}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" component="p">
                {/* Adresa restauracie */}
                <b>Address:</b> {props.restaurant.location.address}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" component="p">
                {/* Typy kuchyne, ktore zastresuju */}
                <b>Cuisines:</b> {props.restaurant.cuisines}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" component="p">
                {/* highlights su v API ulozene ako array, preto ich musim pre zobrazenim oddelit ciarkou a medzerou */}
                <b>Highlights:</b> {props.restaurant.highlights.map((highlight) => highlight += ", ")}
            </Typography>
        </CardContent>
    );
}

export default RestaurantDetail
