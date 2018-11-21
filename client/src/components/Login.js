import React, { Component } from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { Grid, Button, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { UserContext } from "./UserContext";

const styles = theme => ({
  container: {
    direction: "column",
    justify: "center",
    alignItems: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});
class Login extends Component {
  state = {
    btnText: "Login",
    username: "",
    userId: ""
  };
  handleOnSubmit = props => e => {
    e.preventDefault();
    // TO DO: validate username and password match a user :)
    // Login success
    let userId = "";
    // the value we pass in could be directly from our JSON DB :)
    // props.updateAppState({
    //   profile: { username: this.state.username, userId },
    //   isSignedIn: true
    // });
    // props.updateSignInStatus();
    // this.props.history.push("/");
    props.signIn({ profile: { username: this.state.username } });
  };
  handleChange = key => e => {
    // TO DO: add logic to check if username already exists
    // If it does, then log in, otherwise, show the confirm password field
    // and change button text to "Register"
    this.setState({
      [key]: e.target.value
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <UserContext.Consumer>
        {props => (
          <form onSubmit={this.handleOnSubmit(props)}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item xs>
                <TextField
                  id="outlined-username"
                  label="Username"
                  className={classes.textField}
                  value={this.state.username}
                  onChange={this.handleChange("username")}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              {/* <Grid item xs>
                <TextField
                  id="outlined-password"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                />
              </Grid> */}
              <Grid item xs>
                <Button type="submit" variant="contained" color="primary">
                  {this.state.btnText}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </UserContext.Consumer>
    );
  }
}

export default withRouter(withStyles(styles)(Login));
