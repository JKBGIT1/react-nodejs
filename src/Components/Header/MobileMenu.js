import React, {Fragment} from "react";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import MyDrawer from "./MyDrawer";

class MobileMenu extends React.Component {
    state = {
        showDrawer: false // ak je hodnota tejto premenej false, tak je Drawer
    }
    // otvara a zatvara Drawer
    handleDrawer = () => this.setState({ showDrawer: !this.state.showDrawer});

    render() {
        return (
            <Fragment>
                <div style={{flexGrow: 1}}/>
                {/* Drawer sa zobrazi po kliknuti na MenuIcon */}
                <IconButton onClick={this.handleDrawer}>
                    <MenuIcon fontSize={"medium"}/>
                </IconButton>
                <MyDrawer showDrawer={this.state.showDrawer} handleDrawer={this.handleDrawer}/>
            </Fragment>
        );
    }
}

export default MobileMenu;
