import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import {
  Grid,
  AppBar,
  Toolbar,
  Button,
  MenuList,
  MenuItem,
  Grow,
  Popover,
  ClickAwayListener
} from "@material-ui/core";

const UserContextMenu = props => (
  <Popover
    anchorOrigin={{
      vertical: "center",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    open={props.isUserMenuOpen}
    anchorEl={props.anchorEl}
  >
    <ClickAwayListener onClickAway={props.closeUserContextMenu}>
      <MenuList>
        <MenuItem onClick={() => props.goToProfile(props.profile.username)}>
          Profile
        </MenuItem>
        <MenuItem onClick={props.signOut}>Sign Out</MenuItem>
      </MenuList>
    </ClickAwayListener>
  </Popover>
);

class Header extends Component {
  state = {
    anchorEl: null,
    isUserMenuOpen: false
  };

  handleGoTo = path => {
    this.props.history.push(path);
  };

  openUserContextMenu = e => {
    this.setState(state => ({
      anchorEl: this.anchorEl,
      isUserMenuOpen: !state.isUserMenuOpen
    }));
  };

  closeUserContextMenu = e => {
    this.setState({
      anchorEl: null,
      isUserMenuOpen: false
    });
  };

  goToProfile = name => {
    this.closeUserContextMenu();
    this.handleGoTo(`/profile/${name}`);
  };

  render() {
    return (
      <UserContext.Consumer>
        {props => (
          <div>
            <AppBar position="static">
              <Toolbar>
                <Grid container spacing={24} justify="space-between">
                  <Grid item>
                    <Button
                      color="inherit"
                      onClick={() => this.handleGoTo("/")}
                    >
                      Chatrooms
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => this.handleGoTo("/messages")}
                    >
                      Messages
                    </Button>
                  </Grid>
                  <Grid item>
                    {props.isSignedIn ? (
                      <div>
                        <Button
                          variant="text"
                          color="inherit"
                          buttonRef={node => {
                            this.anchorEl = node;
                          }}
                          onClick={this.openUserContextMenu}
                        >
                          Hi, {props.profile.username}
                        </Button>
                        <UserContextMenu {...this.state} {...props} goToProfile={this.goToProfile} closeUserContextMenu={this.closeUserContextMenu} />
                      </div>
                    ) : (
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => this.handleGoTo("/login")}
                      >
                        Login
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default withRouter(Header);
