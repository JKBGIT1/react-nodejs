import React from "react";
import ReactDOM from 'react-dom';
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import ContextProvider from "./Contexts/Context";
import Slide from "@material-ui/core/Slide";

class App extends React.Component {
    render() {
        return (
            <ContextProvider> {/* Poskytuje content z Contex.js pre vsetky componenty */}
                {/* Slide animacia pre nacitani stranky */}
                <Slide in={true} direction={"up"} timeout={1000}>
                    <div>
                        <Header/>
                        <Main/>
                    </div>
                </Slide>
            </ContextProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
