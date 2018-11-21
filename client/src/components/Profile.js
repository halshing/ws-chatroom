import React, { Component } from "react";
import { UserContext } from "./UserContext";

class Profile extends Component {
  state = {};
  render() {
    return (
      <UserContext.Consumer>
        {props => <div>Profile view for {JSON.stringify(props)}</div>}
      </UserContext.Consumer>
    );
  }
}

export default Profile;
