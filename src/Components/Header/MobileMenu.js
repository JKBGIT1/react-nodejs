import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import React, {Fragment} from "react";

class MobileMenu extends React.Component {
    render() {
        return (
            <Fragment>
                <div style={{flexGrow: 1}}/>
                <IconButton>
                    <MenuIcon fontSize={"large"}/>
                </IconButton>
            </Fragment>
        );
    }
}

export default MobileMenu;
