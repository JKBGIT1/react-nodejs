import React from "react";
import ReactDOM from 'react-dom';
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import ContextProvider from "./Contexts/Context";
import Fade from "@material-ui/core/Fade";

const App = () => {
    return (
        <ContextProvider> {/* Poskytuje content z Contex.js pre vsetky componenty */}
            {/* Slide animacia pre nacitani stranky */}
            <Fade in={true} direction={"up"} timeout={1000}>
                <div>
                    <Header/>
                    <Main/>
                </div>
            </Fade>
        </ContextProvider>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));
