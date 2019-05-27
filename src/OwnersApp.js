import React, { Component } from "react";
import AppNavigator from "./routes";
import stores from "./mobx/store";
import { Provider } from "mobx-react";

export default class OwnersApp extends Component {
  render() {
    return (
      <Provider {...stores}>
        <AppNavigator />
      </Provider>
    );
  }
}
