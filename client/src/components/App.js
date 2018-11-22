import React, { Component } from "react";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { UserContext } from "./UserContext";
import Header from "./Header";
import Chats from "./Chats";
import Messages from "./Messages";
import Login from "./Login";
import Profile from "./Profile";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  grow: {
    flexGrow: 1
  }
});

class App extends Component {
  componentWillMount() {
    let user = localStorage.getItem("user");
    if (user)
      this.updateAppState({ profile: { username: user }, isSignedIn: true });

    this.props.history.push("/");
  }

  updateAppState = props => {
    this.setState({
      ...this.state,
      ...props,
      profile: { ...this.state.profile, ...props.profile }
    });
  };

  signIn = user => {
    this.updateAppState({ ...user, isSignedIn: true });
    localStorage.setItem("user", user.profile.username);
    this.props.history.push("/");
  };

  signOut = () => {
    this.updateAppState({
      isSignedIn: false,
      profile: { id: "", username: "", displayname: "" }
    });
    localStorage.removeItem("user");
    this.props.history.push("/");
  };

  state = {
    profile: {
      id: "", // "SLKdk294ee2o2LKFK",
      username: "", // "bbob",
      displayname: "" // "Billy Bob"
    },
    isSignedIn: false,
    signIn: this.signIn,
    signOut: this.signOut,
    updateProfile: this.updateProfile,
    updateAppState: this.updateAppState
  };

  render() {
    // console.log("App rendered", this.state);
    return (
      <UserContext.Provider value={this.state}>
        <div>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Header />
            </Grid>
            <Grid item xs={12}>
              <Switch>
                <Route exact path="/" render={props => <Chats {...props} />} />
                <Route exact path="/messages" component={Messages} />
                <Route
                  exact
                  path="/login"
                  render={props => <Login {...props} />}
                />
                <Route path="/profile/:name" component={Profile} />
                <Redirect to="/" />
              </Switch>
            </Grid>
          </Grid>
        </div>
      </UserContext.Provider>
    );
  }
}

export default withRouter(withStyles(styles)(App));
