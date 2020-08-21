import React from "react";
import HomeMain from "./HomeMain";
import Entry from "./Entry/Entry";
import SearchMain from "./SearchMain";
import { Context } from "../../Contexts/Context";

class Main extends React.Component {
    render() {
        return (
            // na zaciatku zobrazi uvitaciu stranku, ktora sa po prvom vyhladani uz nezobrazi
            <Context.Consumer>{(context) => {
                if (context.clickedSearch || context.clickedMyFavorite)
                    return <SearchMain/>
                if (context.clickedEntry)
                    return <Entry/>
                else
                    return <HomeMain/>
            }}</Context.Consumer>
        );
    }
}

export default Main;
