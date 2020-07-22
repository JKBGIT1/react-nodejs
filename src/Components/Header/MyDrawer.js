import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import React from "react";
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

    static contextType = Context;

    render() {
        return (
            <Drawer variant="persistent" anchor="right" open={this.props.showDrawer}>
                <div style={{padding: "2%"}}>
                    <IconButton onClick={this.props.handleDrawer}>
                        <ChevronRightIcon />
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem>
                        <input style={this.state.styles.input} type={"text"} placeholder={"Search by city"} onChange={this.context.changeInputText}/>
                        <IconButton onClick={this.context.getResByCity}>
                            <SearchIcon color={"inherit"}/>
                        </IconButton>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={"Sign up"}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={"Login"}/>
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default MyDrawer;
