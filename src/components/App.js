import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./HomePage";
import WaitListPage from "./WaitListPage";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={HomePage} />
        <Route path="/waitlist" exact component={WaitListPage} />
        <Route path="/store-waitlist" exact component={WaitListPage} />
      </Router>
    );
  }
}

export default App;
