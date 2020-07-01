import React, { Component } from "react";
import { Form, Button, Badge, Row, Col, Container } from "react-bootstrap";
import Axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama_user: "",
    };
  }
  login = (event) => {
    this.setState({ nama_user: event.target.value });
  };
  componentDidMount = async () => {
    Axios.get("http://localhost:9876/api/v2/produk/list", {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleSubmit = (event) => {
    console.log(this.state.nama_user);
    Axios.post("http://localhost:9876/api/v2/user/login", {
      nama_user: this.state.nama_user,
    })
      .then(function (response) {
        console.log(response.data.message);
        // if (response.data.message === "user tidak ditemukan") {
        // this.props.history.push("/login");
        // } else {
        //   localStorage.setItem("token", response.data.token);
          this.props.history.push("/");
        // }
        // if(localStorage.getItem(''))
      })
      .catch(function (error) {
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
                Sign In
              </h2>
              <Form.Label>Username</Form.Label>
              <Form.Control
                nama_user={this.state.nama_user}
                onChange={this.login}
                placeholder="username"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Container>
              <Row>
                <Col md={6}>
                  <Button
                    style={{ width: "100%" }}
                    size="sm"
                    variant="primary"
                    type="submit"
                  >
                    Login
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
