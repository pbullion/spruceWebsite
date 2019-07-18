import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { SocialIcon } from 'react-social-icons';
import spruce1 from "../../assets/carouselPics/spruce1.jpg";
import spruce2 from "../../assets/carouselPics/spruce2.jpg";
import logo from "../../assets/logos/spruceLogo.png";
import appStore from "../../assets/appstore.svg";

const centerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw"
};

class HomePage extends Component {
  state = {
    businessHours: null,
    specials: null
  };

  _getBusinessHours = () => {
    axios
      .get(`http://18.237.192.82:3001/homeScreen/businessHours`)
      .then(res => {
        const businessHours = res.data;
        this.setState({ businessHours });
      });
  };

  _getSpecials = () => {
    axios.get(`http://18.237.192.82:3001/homeScreen/specials`).then(res => {
      const specials = res.data;
      this.setState({ specials });
    });
  };

  componentWillMount() {
    this._getBusinessHours();
    this._getSpecials();
  }

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
          <img
            src={appStore}
            style={{ marginTop: 10, marginBottom: 10 }}
            alt="app store icon"
          />
        </Row>
        <Row>
          <Link to={"/waitlist"}>
            <h1>Current Waitlist</h1>
          </Link>
        </Row>
        <Row>
          <SocialIcon url="https://www.facebook.com/sprucebarbershop/" bgColor="#2F553C" fgColor="#ffffff"style={{margin: 10}}/>
          <SocialIcon url="https://www.instagram.com/sprucebarbershop/" bgColor="#2F553C" fgColor="#ffffff"style={{margin: 10}}/>
        </Row>
        <Row style={centerStyle}>
          <h3 style={{ marginBottom: 10 }}>Business Hours</h3>
          {this.state.businessHours
            ? this.state.businessHours.map((item, index) => {
                return (
                  <Row
                    style={{ width: "100vw", textAlign: "center" }}
                    key={index}
                  >
                    <Col xs={6}>
                      <p>{item.day}</p>
                    </Col>
                    <Col xs={6}>
                      <p>{item.hours}</p>
                    </Col>
                  </Row>
                );
              })
            : null}
        </Row>
        <Row style={centerStyle}>
          <h3 style={{ marginBottom: 10 }}>Specials</h3>
          {this.state.specials
            ? this.state.specials.map((item, index) => {
                return (
                  <Row
                    style={{ width: "100vw", textAlign: "center" }}
                    key={index}
                  >
                    <Col xs={6}>
                      <p>{item.type}</p>
                    </Col>
                    <Col xs={6}>
                      <p>{item.special}</p>
                    </Col>
                  </Row>
                );
              })
            : null}
        </Row>
      </Container>
    );
  }
}

export default withRouter(HomePage);
