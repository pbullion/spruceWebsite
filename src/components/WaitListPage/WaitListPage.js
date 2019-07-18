import React, { Component, Fragment } from "react";
import axios from "axios";
import moment from "moment";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class WaitListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedWaitList: [],
      working: false
    };
  }

  _onRefresh = () => {
    this._getStaff();
    // this._getStaffWaitTimes();
  };

  _timeConvert = time => {
    const num = time;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    if (rminutes < 10) {
      return rhours + ":0" + rminutes;
    } else {
      return rhours + ":" + rminutes;
    }
  };

  // _getStaffWaitTimes = () => {
  //     axios.get(`http://18.237.192.82:3001/waitlist/totals`)
  //         .then(res => {
  //             const lowestStaffWait = res.data[0].lowestWait;
  //             const waitTimesForStaff = res.data[1];
  //             this.setState({waitTimesForStaff});
  //             this.setState({lowestStaffWait});
  //         });
  // };

  _getStaff = () => {
    axios.get(`http://18.237.192.82:3001/staff/working`).then(res => {
      const staff = res.data;
      let i;
      this.setState({ staff });
      for (i = 0; i < staff.length; i++) {
        if (staff[i].isWorking === true) {
          this.setState({ working: true });
        }
      }
      for (i = 0; i < staff.length; i++) {
        const staffid = staff[i].staffid;
        axios
          .get(`http://18.237.192.82:3001/waitlist/staffmember/${staffid}`)
          .then(res => {
            if (res.data.length > 0) {
              const updatedWaitList = [];
              for (let i = 0; i < res.data.length; i++) {
                // if (res.data[i].service2_id === 0) {
                //     res.data[i].service2_time = 0
                // } else {
                //     res.data[i].service2_time = res.data[i].res.data[i].service2_time
                // }
                // // console.log("******************", res.data[i].service2_time);
                // // console.log("asdfasdfasdfasdf", res.data[i].res.data[i].service2_time);
                if (res.data[i].in_progress) {
                  res.data[i].remainingTime =
                    res.data[i].service1_time +
                    res.data[i].service2_time -
                    parseInt(
                      moment(res.data[i].start_time, "HH:mm").fromNow(true),
                      10
                    );
                  if (!res.data[i].remainingTime) {
                    res.data[i].remainingTime =
                      res.data[i].service1_time + res.data[i].service2_time;
                  }
                  updatedWaitList.push(res.data[i]);
                } else if (res.data[i].waiting) {
                  if (i === 0) {
                    res.data[i].remainingTime = 0;
                  } else if (i === 1) {
                    res.data[i].remainingTime = res.data[i - 1].remainingTime;
                  } else {
                    res.data[i].remainingTime =
                      res.data[i - 1].remainingTime +
                      res.data[i - 1].service1_time +
                      res.data[i - 1].service2_time;
                  }
                  updatedWaitList.push(res.data[i]);
                }
              }
              this.setState({ [res.data[0].staff_last_name]: updatedWaitList });
            }
          });
      }
    });
  };

  componentDidMount() {
    this._onRefresh();
  }

  render() {
    return (
      <Container
        fluid={true}
        style={{
          backgroundColor: "#2F553C",
          color: "white",
          paddingTop: 20,
          height: "100%"
        }}
      >
        <Row>
          {this.state.staff
            ? this.state.staff.map((item, index) => {
                return (
                  <Col
                    md={3}
                    style={{ textAlign: "center", paddingBottom: 25 }}
                  >
                    <h1
                      style={{ color: "white", paddingBottom: 10 }}
                      key={index}
                    >
                      {item.first_name} {item.last_name}
                    </h1>
                    {this.state[item.last_name]
                      ? this.state[item.last_name].map((item2, index) => {
                          {
                            if (index < 4) {
                              return (
                                <Row style={{ paddingBottom: 10 }}>
                                  <Col xs={2} style={{ marginTop: "5%" }}>
                                    <h1 style={{ color: "white" }}>
                                      {index < 1 ? null : index}
                                    </h1>
                                  </Col>
                                  <Col xs={4}>
                                    <h4 style={{ color: "white" }}>
                                      {item2.customer_first_name}{" "}
                                      {item2.customer_last_name}
                                    </h4>
                                    <h6 style={{ color: "white" }}>
                                      {item2.in_progress
                                        ? "Rem. Time"
                                        : "Wait Time"}
                                    </h6>
                                    <h4
                                      style={{ paddingTop: 5, color: "white" }}
                                    >
                                      {item2.remainingTime > 60
                                        ? this._timeConvert(item2.remainingTime)
                                        : item2.remainingTime + " min."}
                                    </h4>
                                  </Col>
                                  <Col xs={6}>
                                    <div>{item2.service1_name}</div>
                                    <div>{item2.service1_time} min.</div>
                                    {item2.service2_id ? (
                                      <Fragment>
                                        <div>{item2.service2_name}</div>
                                        <div>{item2.service2_time} min.</div>
                                      </Fragment>
                                    ) : null}
                                    <div>
                                      Status:{" "}
                                      {item2.in_progress
                                        ? "In Progress"
                                        : "Waiting"}
                                    </div>
                                    <h5 style={{ paddingTop: 5, color: "red" }}>
                                      {item2.mobile_join
                                        ? "JOINED FROM APP"
                                        : null}
                                    </h5>
                                  </Col>
                                </Row>
                              );
                            }
                          }
                        })
                      : null}
                    {this.state[item.last_name] &&
                    this.state[item.last_name].length > 4 ? (
                      <h3 style={{ color: "white" }}>
                        Plus {this.state[item.last_name].length - 4} more not
                        shown
                      </h3>
                    ) : null}
                  </Col>
                );
              })
            : null}
        </Row>
      </Container>
    );
  }
}

export default WaitListPage;
