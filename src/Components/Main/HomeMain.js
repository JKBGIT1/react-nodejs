import React from "react";
import Typography from "@material-ui/core/Typography";

import Background1 from "../../Images/Img1.jpg";
import {Context} from "../../Contexts/Context";
import Fade from "@material-ui/core/Fade";

class HomeMain extends React.Component {
    state = {
        styles: {
            // vycentruje a roztiahne backgroundImage na sirku aj na dlzku obrazovky
            // elementy, ktore su v dive vycentruje horizontalne aj vertikalne
            backgroundImg: {
                width: "100vw",
                height: "100vh",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `url(${Background1})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundAttachment: "fixed",
            },
            welcomeText: {
                color: "white",
                textShadow: "1px 0px gray",
            }
        },
    }

    render() {
        const { styles } = this.state;

        return (
            <Context.Consumer>{(context) =>
                <Fade in={true} timeout={1000}>
                    <div style={styles.backgroundImg}>
                        <Typography variant={"h1"} style={styles.welcomeText}>
                            <b>
                                Welcome {context.logedUser ? context.logedUser.userName : null}
                            </b>
                        </Typography>
                    </div>
                </Fade>
            }</Context.Consumer>
        );
    }
}

export default HomeMain;
