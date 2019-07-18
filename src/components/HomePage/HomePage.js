import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class HomePage extends Component {
  state = {};

  componentWillMount() {

  }

  render() {
    return (
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1>Hello</h1>
      </Container>
    );
  }
}

export default withRouter(HomePage);
