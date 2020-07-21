import React, {Fragment} from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import {Context} from "../../Contexts/Context";

class DesktopToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: {
                input: {
                    border: "none",
                    fontSize: "16px"
                }
            },
        }
    }

    static contextType = Context;

    render() {
        return (
            <Fragment>
                <input style={this.state.styles.input} type={"text"} placeholder={"Search by city"} onChange={this.context.changeInputText}/>
                <IconButton onClick={this.context.getResByCity}>
                    <SearchIcon color={"inherit"}/>
                </IconButton>
                <div style={{flexGrow: 1}}/>
                <Button color={"inherit"}>Sign up</Button>
                <Button color={"inherit"}>Login</Button>
            </Fragment>
        );
    }
}

export default DesktopToolBar;
