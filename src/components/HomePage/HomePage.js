import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// import "./HomePage.css";
import spruce1 from "../../assets/carouselPics/spruce1.jpg";
import spruce2 from "../../assets/carouselPics/spruce2.jpg";
import special from "../../assets/carouselPics/special.jpg";
import logo from "../../assets/logos/spruceLogo.png";
import appStore from "../../assets/appstore.svg";

const centerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};

class HomePage extends Component {
  state = {};

  componentWillMount() {}

  render() {
    return (
      <Container style={centerStyle} fluid>
        <Row style={centerStyle}>
          <img src={logo} style={{ height: 150 }} />
        </Row>
        <Row>
          <Carousel
            infiniteLoop={true}
            showThumbs={false}
            width="100%"
            autoPlay={true}
            interval={5000}
            showStatus={false}
            showIndicators={false}
          >
            <div>
              <img src={spruce1} />
            </div>
            <div>
              <img src={spruce2} />
            </div>
          </Carousel>
        </Row>
        <Row>
          <img src={appStore} style={{ marginTop: 10 }} alt="home screen" />
        </Row>
        <Row>
          <Link to={"/waitlist"}>
            <h1>Current Waitlist</h1>
          </Link>
        </Row>
        <Row>
          <h3>Business Hours</h3>
        </Row>
        <Row>
          <h3>Specials</h3>
        </Row>
      </Container>
    );
  }
}

export default withRouter(HomePage);
