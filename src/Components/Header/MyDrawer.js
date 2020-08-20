import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import SearchIcon from "@material-ui/icons/Search";
import {Context} from "../../Contexts/Context";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

class MyDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: {
                input: {
                    border: "none",
                    fontSize: "16px",
                }
            }
        }
    }

    searchClicked = (context, props) => {
        context.getResByCity(); // API call na restauracie vo vyhladavanom meste
        props.handleDrawer(); // ked API vrati restauracie, tak sa Drawer zavrie
    }

    static contextType = Context; // dostanem udaje z Context.js,

    render() {
        return (
            <Drawer variant="persistent" anchor="right" open={this.props.showDrawer}>
                <div style={{ padding: "2%" }}>
                    {/* Zatvara Drawer */}
                    <IconButton onClick={this.props.handleDrawer}>
                        <ChevronRightIcon />
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem>
                        {/* Po kliknuti na input sa vymaze jeho predosla value
                            s value v inpute sa meni aj hodnota inputText v contexte */}
                        <input
                            type={"text"}
                            placeholder={"Search by city"}
                            style={this.state.styles.input}
                            onClick={this.context.deleteText}
                            onChange={this.context.changeInputText}
                        />
                        <IconButton onClick={() => this.searchClicked(this.context, this.props)}>
                            <SearchIcon color={"inherit"}/>
                        </IconButton>
                    </ListItem>
                    {/* Treba dorobit prihlasovanie a registraciu uzivatelov */}
                    {this.context.logedUser ?
                        <React.Fragment>
                            <ListItem button onClick={this.context.goMyFavorite}>
                                <ListItemText primary={"My Favorite"}/>
                            </ListItem>
                            <ListItem button onClick={this.context.logout}>
                                <ListItemText primary={"Log out"}/>
                            </ListItem>
                        </React.Fragment> :
                        <React.Fragment>
                            <ListItem button>
                                <ListItemText primary={"Sign up"} onClick={ () => this.context.goEntry(false) }/>
                            </ListItem>
                            <ListItem button onClick={ () => this.context.goEntry(true) }>
                                <ListItemText primary={"Login"}/>
                            </ListItem>
                        </React.Fragment>
                    }
                </List>
            </Drawer>
        );
    }
}

export default MyDrawer;
