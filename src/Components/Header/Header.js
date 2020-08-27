import React from "react";
import AppBar from "@material-ui/core/AppBar";
import {Context} from "../../Contexts/Context";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import MobileMenu from "./MobileMenu";
import DesktopToolBar from "./DesktopToolBar";

class Header extends React.Component {
    render() {
        return (
            <AppBar color={"default"}>
                <Toolbar>
                    <Typography
                        variant={"h5"}
                        style={{ marginRight: "16px" }}
                    >
                        Restaurants
                    </Typography>
                    <Context.Consumer>{(context) => {
                        // podla toho aka je sirka stranky sa zobrazi component
                        return context.screenWidth > 600 ? <DesktopToolBar/> : <MobileMenu/>;
                    }}</Context.Consumer>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
