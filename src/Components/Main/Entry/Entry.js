import React from "react";
import {Context} from "../../../Contexts/Context";
import Grid from "@material-ui/core/Grid";
import {MySignUpCard} from "./MySignUpCard";
import {MyLoginCard} from "./MyLoginCard";

class Entry extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            userName: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
        }
    }

    handleLogin = (context) => {
        this.setState({ loading: true });
        context.tryLogin(this.state.userName, this.state.password);
        this.setState({
            loading: false,
            userName: "",
            password: "",
        });
    }

    handleSignUp = (context) => {
        const { firstName, lastName, email, userName, password } = this.state;
        this.setState({ loading: true });
        context.trySignUp(firstName, lastName, email, userName, password);
        this.setState({
            loading: false,
            userName: "",
            password: "",
        });
    }

    updateUserName = (event) => this.setState({ userName: event.target.value });

    updatePassword = (event) => this.setState({ password: event.target.value });

    updateFirstName = (event) => this.setState({ firstName: event.target.value });

    updateLastName = (event) => this.setState({ lastName: event.target.value });

    updateEmail = (event) => this.setState({ email: event.target.value });

    render() {
        if (this.state.loading)
            return (<h1>Loading...</h1>);

        return (
            <Context.Consumer>{(context) => {
                const margin = context.screenWidth < 600 ? "65px" : "75px";

                return (
                    <Grid
                        container
                        justify={"center"}
                        direction={"column"}
                        alignItems={"center"}
                        style={{margin: `${margin} 0 ${margin} 0`}}
                    >
                        {context.login ?
                            <MyLoginCard
                                context={context}
                                state={this.state}
                                handleLogin={this.handleLogin}
                                updateUserName={this.updateUserName}
                                updatePassword={this.updatePassword}
                            /> :
                            <MySignUpCard
                                context={context}
                                state={this.state}
                                handleSignUp={this.handleSignUp}
                                updateUserName={this.updateUserName}
                                updatePassword={this.updatePassword}
                                updateFirstName={this.updateFirstName}
                                updateLastName={this.updateLastName}
                                updateEmail={this.updateEmail}
                            />}
                    </Grid>
                );
            }}
            </Context.Consumer>
        );
    }
}

export default Entry;
