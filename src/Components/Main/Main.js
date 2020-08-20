import React from "react";
import HomeMain from "./HomeMain";
import SearchMain from "./SearchMain";
import {Context} from "../../Contexts/Context";
import Entry from "./Entry/Entry";
import MyFavorite from "./MyFavorite";

class Main extends React.Component {
    render() {
        return (
            // na zaciatku zobrazi uvitaciu stranku, ktora sa po prvom vyhladani uz nezobrazi
            <Context.Consumer>{(context) => {
                if (context.clickedSearch)
                    return <SearchMain/>
                if (context.clickedEntry)
                    return <Entry/>
                if (context.clickedMyFavorite)
                    return <MyFavorite/>
                else
                    return <HomeMain/>
            }}</Context.Consumer>
        );
    }
}

export default Main;
