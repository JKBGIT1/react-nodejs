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
                    fontSize: "16px",
                    backgroundColor: "#f5f5f5",
                }
            },
        }
    }

    static contextType = Context; // dostanem udaje z Context.js

    render() {
        return (
            <Fragment>
                {/* Po kliknuti na input sa vymaze jeho predosla value
                    s value v inpute sa meni aj hodnota inputText v contexte */}
                <input
                    type={"text"}
                    placeholder={"Search by city"}
                    style={this.state.styles.input}
                    onClick={this.context.deleteText}
                    onChange={this.context.changeInputText}
                />
                {/* Po kliknuti sa vyvola API get na restauracie, ktore sa nachadzaju v input.value, co by mal byt nazov mesta */}
                <IconButton onClick={this.context.getResByCity}>
                    <SearchIcon color={"inherit"}/>
                </IconButton>
                <div style={{flexGrow: 1}}/>
                {/* Treba dorobit prihlasovanie a registraciu uzivatelov */}
                <Button color={"inherit"}>Sign up</Button>
                <Button color={"inherit"}>Login</Button>
            </Fragment>
        );
    }
}

export default DesktopToolBar;
