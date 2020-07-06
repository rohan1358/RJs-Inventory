import React, { Component } from "react";
import { Form, Button, Badge, Row, Col, Container } from "react-bootstrap";
import Axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama_user: "",
      hidden: true,
    };
  }
  login = (event) => {
    this.setState({ nama_user: event.target.value });
  };
  componentDidMount = async () => {
    console.log(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    if (token !== null) {
      this.props.history.push("/home");
    }
  };
  handleSubmit = (event) => {
    console.log(this.state.nama_user);
    Axios.post("http://localhost:9876/api/v2/user/insert", {
      nama_user: this.state.nama_user,
    })
      .then((response) => {
        console.log(response);
        // if (response.data.message === "user tidak ditemukan") {
        //   this.setState({ hidden: false });
          this.props.history.push("/");
        // } else {
        //   localStorage.setItem("token", response.data.token);
        //   this.props.history.push("/home");
        // }
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  };
  render() {
    return (
      <div
        style={{
          backgroundColor: "#4688ab",
          height: "100%",
          paddingLeft: "30%",
          paddingRight: "30%",
          paddingTop: "100px",
          paddingBottom: "100px",
        }}
      >
        <div
          style={{
            backgroundColor: "lightblue",
            padding: "50px",
            marginTop: "10px",
            marginBottom: "10px",
            borderRadius: "20px",
          }}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  borderBottom: "2px solid black",
                  paddingBottom: "20px",
                }}
              >
                Register
              </h2>
              <p
                hidden={this.state.hidden}
                style={{ color: "red", marginBottom: "0px" }}
              >
                *Username Tidak Ditemuka
              </p>
              <Form.Label>Username</Form.Label>
              <Form.Control
                nama_user={this.state.nama_user}
                onChange={this.login}
                placeholder="username"
              />
              <Form.Text className="text-muted">
                We'll never share your username with anyone else.
              </Form.Text>
            </Form.Group>
            <Container>
              <Row>
                <Col md={6}>
                  <Button
                    style={{ width: "100%" }}
                    size="sm"
                    variant="primary"
                    onClick={() => this.props.history.push("/")}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col md={6}>
                  <Button
                    style={{ width: "100%" }}
                    size="sm"
                    variant="primary"
                    type="submit"
                  >
                    Register
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
      </div>
    );
  }
}
