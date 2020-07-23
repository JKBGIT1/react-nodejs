import React, {Fragment} from "react";
import ReactDOM from 'react-dom';
import Main from "./Components/Main/Main";
import Slide from "@material-ui/core/Slide";
import Header from "./Components/Header/Header";
import ContextProvider from "./Contexts/Context";

const App = () => {
    return (
        <ContextProvider> {/* Poskytuje content z Contex.js pre vsetky componenty */}
            {/* Slide animacia pre nacitani stranky */}
            <Slide direction={"up"} in={true} timeout={800} mountOnEnter unmountOnExit>
                <div>
                    <Header/>
                    <Main/>
                </div>
            </Slide>
        </ContextProvider>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));
