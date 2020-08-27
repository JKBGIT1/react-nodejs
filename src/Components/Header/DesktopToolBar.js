import React from "react";
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
            <React.Fragment>
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
                {/* Ak je pouzivatel prihlaseny, tak moze zobrazit svoje oblubene restauracie alebo sa odlhlasit */}
                {/* Ked pouzivatel nie je prihlaseny, tak sa moze prihlasit alebo vytvorit novy ucet */}
                {this.context.logedUser ?
                  <React.Fragment>
                      <Button color={"inherit"} onClick={this.context.goMyFavorite}>My Favorite</Button>
                      <Button color={"inherit"} onClick={this.context.logout}>Log out</Button>
                  </React.Fragment>  :
                    <React.Fragment>
                        <Button color={"inherit"} onClick={ () => this.context.goEntry(false) }>Sign up</Button>
                        <Button color={"inherit"} onClick={ () => this.context.goEntry(true) }>Login</Button>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default DesktopToolBar;
