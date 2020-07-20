import React from "react";
import Grid from "@material-ui/core/Grid";

import ReactDOM from 'react-dom';
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";

const getCategories = () => {
    fetch('https://developers.zomato.com/api/v2.1/categories', {
        method: 'get',
        headers: new Headers({
            "user-key": "596aefd8ba1b3c415c0ef3fc3523449b",
            "content-type": "application/json"
        }),
    }).then(response => response.json())
        .then(data => console.log(data));
}

const getCities = () => {
    fetch('https://developers.zomato.com/api/v2.1/cities', {
        method: 'get',
        headers: new Headers({
            "user-key": "596aefd8ba1b3c415c0ef3fc3523449b",
            "content-type": "application/json"
        }),
    }).then(response => response.json())
        .then(data => console.log(data));
}

const App = () => {
    return (
        <Grid container direction={"column"}>
            <Header/>
            <Main/>
        </Grid>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));
