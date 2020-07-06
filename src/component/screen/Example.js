import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
export default class example extends Component {
  constructor() {
    super();
    this.state = {};
  }
  handleSubmit = () => {
    let formData = new FormData();
    formData.append("nama", this.state.nama);
    console.log(formData);
  };
  render() {
    return (
      <div>
        <Form >
          <Form.Group controlId="formBasicEmail">
            <Form.Label onChange={(nama) => this.setState(nama)}>
              Email address
            </Form.Label>
            <Form.Control placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" onClick={() => this.handleSubmit()}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
