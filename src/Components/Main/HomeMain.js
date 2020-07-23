import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Background1 from "../../Images/Img1.jpg"

class HomeMain extends React.Component {
    state = {
        styles: {
            backgroundImg: {
                width: "100vw",
                height: "100vh",
                backgroundImage: `url(${Background1})`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
            },
            welcomeText: {
                color: "white",
                textShadow: "1px 0px gray",
            }
        },
    }

    render() {
        return (
            <Grid container justify={"center"} alignItems={"center"} style={this.state.styles.backgroundImg}>
                <Grid item>
                    <Typography variant={"h1"} style={this.state.styles.welcomeText}><b>Welcome</b></Typography>
                </Grid>
            </Grid>
        );
    }
}

export default HomeMain;
