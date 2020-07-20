import React from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: {
                divFlex: {
                    flexGrow: 1
                },
                appBarTypo: {
                    marginRight: "16px",
                },
                input: {
                    border: "none",
                    fontSize: "16px"
                }
            },
            inputText: "",
            searchingCity: null,
        }
    }

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
                        <input type={"text"} placeholder={"Search by city"} style={this.state.styles.input} onChange={this.changeInputText}/>
                        <IconButton onClick={this.getRestaurantsByCity}>
                            <SearchIcon color={"inherit"}/>
                        </IconButton>
                        <div style={this.state.styles.divFlex}/>
                        <Button color={"inherit"}>Sign up</Button>
                        <Button color={"inherit"}>Login</Button>
                    </Toolbar>
                </AppBar>
            </Grid>
        );
    }
}

export default Header;
