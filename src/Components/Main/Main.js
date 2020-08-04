import React from "react";
import HomeMain from "./HomeMain";
import SearchMain from "./SearchMain";
import {Context} from "../../Contexts/Context";

class Main extends React.Component {
    render() {
        return (
            // na zaciatku zobrazi uvitaciu stranku, ktora sa po prvom vyhladani uz nezobrazi
            <Context.Consumer>{(context) => {
                return context.clickedSearch ? <SearchMain/> : <HomeMain/>;
            }}</Context.Consumer>
        );
    }
}

export default Main;
