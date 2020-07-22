import React from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Context} from "../../Contexts/Context";
import DesktopToolBar from "./DesktopToolBar";
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

    render() {
        return (
            <Grid item>
                <AppBar color={"transparent"} position="static">
                    <Toolbar>
                        <Typography style={this.state.styles.appBarTypo} variant={"h5"}>Restaurants</Typography>
                        <Context.Consumer>{(context) => {
                            return context.screenWidth > 600 ? <DesktopToolBar/> : <MobileMenu/>;
                        }}
                        </Context.Consumer>
                    </Toolbar>
                </AppBar>
            </Grid>
        );
    }
}

export default Header;
