import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import "./main.css";

class HomeMain extends React.Component {
    state = {
        styles: {
            welcomeText: {
                color: "white",
                textShadow: "1px 0px gray",
            }
        },
    }

    render() {
        return (
            <Grid container justify={"center"} alignItems={"center"} className={"background-container"}>
                <Grid item>
                    <Typography variant={"h1"} style={this.state.styles.welcomeText}><b>Welcome</b></Typography>
                </Grid>
            </Grid>
        );
    }
}

export default HomeMain;
