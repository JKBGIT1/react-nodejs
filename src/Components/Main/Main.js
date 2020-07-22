import React from "react";
import HomeMain from "./HomeMain";
import Grid from "@material-ui/core/Grid";

class Main extends React.Component {
    render() {
        return (
            <Grid item container>
                <HomeMain/>
            </Grid>
        );
    }
}

export default Main;
