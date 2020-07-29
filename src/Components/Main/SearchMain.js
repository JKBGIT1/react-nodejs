import React from "react";
import {Context} from "../../Contexts/Context";
import Typography from "@material-ui/core/Typography";

class SearchMain extends React.Component {
    static typeContext = Context;

    render() {
        return (
            this.context.searchingCity ? <Typography variant={"h1"}>Pipik</Typography> : <Typography variant={"h1"}>Nepipik</Typography>
        );
    }
}

export default SearchMain;
