import React from "react";
import Grid from "@material-ui/core/Grid";
import Background1 from "../../Images/Img1.jpg";
import Background2 from "../../Images/Img2.jpg";
import Background3 from "../../Images/Img3.jpg";
import Typography from "@material-ui/core/Typography";

class HomeMain extends React.Component {
    state = {
        index: 0,
        styles: {
            backgroundImg: {
                width: "100vw",
                height: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            },
            welcomeText: {
                color: "white",
                textShadow: "1px 0px gray",
            }
        },
        images: [Background1, Background2, Background3],
    }

    componentDidMount() {
        this.interval = setInterval(() => this.changeBackground(), 3000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    changeBackground = () => {
        let num = this.state.index;
        if (num + 1 < this.state.images.length)
            num += 1;
        else
            num = 0;

        this.setState({index: num});
    }

    render() {
        const backImage = this.state.images[this.state.index];

        return (
            <Grid item
                  container
                  justify={"center"}
                  alignItems={"center"}
                  style={{...this.state.styles.backgroundImg,
                          backgroundImage: `url(${backImage})`}}
            >
                <Grid item>
                    <Typography variant={"h1"} style={this.state.styles.welcomeText}><b>Welcome</b></Typography>
                </Grid>
            </Grid>
        );
    }
}

export default HomeMain;
