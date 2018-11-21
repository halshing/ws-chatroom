import React, { Component } from "react";
import { UserContext } from "./UserContext";

class Chats extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {props => <div>Showing all chats! {JSON.stringify(props)}</div>}
      </UserContext.Consumer>
    );
  }
}

export default Chats;
