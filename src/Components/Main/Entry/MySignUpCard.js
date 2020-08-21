import React from "react";
import {
    Card,
    Grid,
    Button,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
    TextField
} from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

export const MySignUpCard = (props) => {
    const { context } = props;
    const { firstName, lastName, email, userName, password } = props.state;

    return (
        <Grid item md={6} style={{ width: "100%" }}>
            <Fade in={true} timeout={1000}>
                <Card style={{ margin: "0 8px 0 8px" }}>
                    <CardHeader
                        title={"Sign up"}
                        style={{ textAlign: "center" }}
                    />
                    <CardMedia
                        style={{height: 0, paddingTop: '56.25%'}}
                        title={"Zomato Add"}
                        image={require("../../../Images/zomato_add.jpg")}
                    />
                    <CardContent style={{ margin: "auto", width: "60%" }}>
                        <Grid container alignItems={"center"} justify={"center"}>
                            <Grid item xs={10}>
                                <form noValidate autoComplete="off">
                                    <TextField
                                        value={firstName}
                                        label="First Name"
                                        id="standard-basic"
                                        onChange={props.updateFirstName}
                                        style={{ width: "100%", margin: "1%" }}
                                    />
                                </form>
                                <form noValidate autoComplete="off">
                                    <TextField
                                        value={lastName}
                                        label="Last Name"
                                        id="standard-basic"
                                        onChange={props.updateLastName}
                                        style={{ width: "100%", margin: "1%" }}
                                    />
                                </form>
                                <form noValidate autoComplete="off">
                                    <TextField
                                        value={email}
                                        label="Email"
                                        id="standard-basic"
                                        onChange={props.updateEmail}
                                        style={{ width: "100%", margin: "1%" }}
                                    />
                                </form>
                                <form noValidate autoComplete="off">
                                    <TextField
                                        value={userName}
                                        label="User Name"
                                        id="standard-basic"
                                        onChange={props.updateUserName}
                                        style={{ width: "100%", margin: "1%" }}
                                    />
                                </form>
                                <form noValidate autoComplete="off">
                                    <TextField
                                        value={password}
                                        label="Password"
                                        type={"password"}
                                        id="standard-adornment-password"
                                        onChange={props.updatePassword}
                                        style={{ width: "100%", margin: "1%" }}
                                    />
                                </form>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Button size="medium" style={{ width: "100%" }} onClick={() => props.handleSignUp(context)}>Sign up</Button>
                        <Button size="medium" style={{ width: "100%" }} onClick={context.changeEntry}>Have an account</Button>
                    </CardActions>
                </Card>
            </Fade>
        </Grid>
    );
}
