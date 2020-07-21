import React from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {Context} from "../../Contexts/Context";
import DesktopToolBar from "./DesktopToolBar";
import MenuIcon from '@material-ui/icons/Menu';
import MobileToolBar from "./MobileToolBar";
import MobileMenu from "./MobileMenu";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: {
                appBarTypo: {
                    marginRight: "16px",
                },
            },
        }
    }

    static contextType = Context;

    changeInputText = (event) => {
        this.setState({inputText: event.target.value});
    }

    getCity = () => {
        fetch(`https://developers.zomato.com/api/v2.1/cities?q=${this.state.inputText}`, {
            method: 'get',
            headers: new Headers({
                "user-key": "596aefd8ba1b3c415c0ef3fc3523449b",
                "content-type": "application/json"
            }),
        })
            .then(response => response.json())
            .then(data => console.log(data.location_suggestions[0].id))
            .catch(error => console.log(error));
    }

    getRestaurantsByCity = () => {
        this.getCity();
    }

    render() {
        return (
            <Grid item>
                <AppBar color={"transparent"} position="static">
                    <Toolbar>
                        <Typography style={this.state.styles.appBarTypo} variant={"h5"}>Restaurants</Typography>
                        {this.context.screenWidth > 900 ?
                            <DesktopToolBar/> :
                            <MobileMenu/>
                        }
                    </Toolbar>
                </AppBar>
            </Grid>
        );
    }
}

export default Header;
