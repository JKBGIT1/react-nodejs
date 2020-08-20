import React from "react";
import {Card, Grid, Button, CardActions, CardContent, CardHeader, CardMedia, Typography} from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

export const MySignUpCard = (props) => {
    const { context } = props;
    const { firstName, lastName, email, userName, password } = props.state;

    return (
        <Grid item md={4} style={{ width: "100%" }}>
            <Fade in={true} timeout={1000}>
                <Card>
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
                            <Grid item xs={6}>
                                <Typography style={{ padding: "1%"}}>
                                    First Name:
                                </Typography>
                                <Typography style={{ padding: "1%"}}>
                                    Last Name:
                                </Typography>
                                <Typography style={{ padding: "1%"}}>
                                    Email:
                                </Typography >
                                <Typography style={{ padding: "1%"}}>
                                    User Name:
                                </Typography>
                                <Typography style={{ padding: "1%"}}>
                                    Password:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                    type={"text"}
                                    value={firstName}
                                    placeholder={"First Name"}
                                    onChange={props.updateFirstName}
                                    style={{ margin: "3%", padding: "1%", border: "none" }}
                                />
                                <input
                                    type={"text"}
                                    value={lastName}
                                    placeholder={"Last Name"}
                                    onChange={props.updateLastName}
                                    style={{ margin: "3%", padding: "1%", border: "none" }}
                                />
                                <input
                                    type={"text"}
                                    value={email}
                                    placeholder={"Email"}
                                    onChange={props.updateEmail}
                                    style={{ margin: "3%", padding: "1%", border: "none" }}
                                />
                                <input
                                    type={"text"}
                                    value={userName}
                                    placeholder={"User Name"}
                                    onChange={props.updateUserName}
                                    style={{ margin: "3%", padding: "1%", border: "none" }}
                                />
                                <input
                                    type={"text"}
                                    value={password}
                                    placeholder={"Password"}
                                    onChange={props.updatePassword}
                                    style={{ margin: "3%", padding: "1%", border: "none" }}
                                />
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
