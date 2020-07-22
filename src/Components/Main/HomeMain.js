import React from "react";
import Grid from "@material-ui/core/Grid";
import Background1 from "../../Images/Img1.jpg";
import Typography from "@material-ui/core/Typography";

class HomeMain extends React.Component {
    state = {
        styles: {
            backgroundImg: {
                width: "100vw",
                height: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                backgroundImage: `url(${Background1})`
            },
            welcomeText: {
                color: "white",
                textShadow: "1px 0px gray",
            }
        },
    }

    render() {
        return (
            <Grid item
                  container
                  justify={"center"}
                  alignItems={"center"}
                  style={this.state.styles.backgroundImg}
            >
                <Grid item>
                    <Typography variant={"h1"} style={this.state.styles.welcomeText}><b>Welcome</b></Typography>
                </Grid>
            </Grid>
        );
    }
}

export default HomeMain;
