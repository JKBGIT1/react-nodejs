import React, {Fragment} from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

class MobileToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: {
                input: {
                    border: "none",
                    fontSize: "16px"
                }
            },
            inputText: "",
            searchingCity: null,
        }
    }

    render() {
        return (
            <Fragment>
                <input style={this.state.styles.input} type={"text"} placeholder={"Search by city"}/>
                <IconButton>
                    <SearchIcon color={"inherit"}/>
                </IconButton>
                <Button color={"inherit"}>Sign up</Button>
                <Button color={"inherit"}>Login</Button>
            </Fragment>
        );
    }
}

export default MobileToolBar;
