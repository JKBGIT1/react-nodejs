import React from "react";
import ReactDOM from 'react-dom';
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import ContextProvider from "./Contexts/Context";
import Slide from "@material-ui/core/Slide";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {Breakpoints as breakpoints} from "@material-ui/core/styles/createBreakpoints";

const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
    breakpoints,
    overrides: {
        MuiTypography: {
            h1: {
                fontSize: "5.7rem",
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: "6rem"
                }
            },
            h5: {
                fontSize: "1.2rem",
                [defaultTheme.breakpoints.up("sm")]: {
                    fontSize: "1.5rem"
                }
            }
        }
    }
})

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}> {/* V tejto theme su zmenene velkosti nadpisov podla breakpointov */}
                <ContextProvider> {/* Poskytuje content z Contex.js pre vsetky componenty */}
                    {/* Slide animacia pre nacitani stranky */}
                    <Slide in={true} direction={"up"} timeout={1000}>
                        <div>
                            <Header/>
                            <Main/>
                        </div>
                    </Slide>
                </ContextProvider>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
