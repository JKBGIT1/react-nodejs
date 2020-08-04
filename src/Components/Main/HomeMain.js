import React from "react";
import Typography from "@material-ui/core/Typography";

import Background1 from "../../Images/Img1.jpg";

class HomeMain extends React.Component {
    state = {
        styles: {
            // vycentruje a roztiahne backgroundImage na sirku aj na dlzku obrazovky
            // elementy, ktore su v dive vycentruje horizontalne aj vertikalne
            backgroundImg: {
                width: "100vw",
                height: "100vh",
                display: "flex",
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
            <div style={styles.backgroundImg}>
                <Typography variant={"h1"} style={styles.welcomeText}><b>Welcome</b></Typography>
            </div>
        );
    }
}

export default HomeMain;
