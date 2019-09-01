import React, { Component } from "react";
import { Button, FormGroup, FormControl, Row, Container } from "react-bootstrap";
import { Redirect} from 'react-router-dom'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    console.log(this.props)
    this.createUserSession = this.createUserSession.bind(this);
  }

  createUserSession = async () => {
    const request = this.props.signIn(this.state.email, this.state.password)
    const response = await request;
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    this.createUserSession();
    event.preventDefault();
  }

  render() {
    if(this.props.tokenAuthHeaders.role && this.props.tokenAuthHeaders.role === "restaurant_owner"){
      return <Redirect to="/owner"/>
    }
    else if(this.props.tokenAuthHeaders.role){
      return <Redirect to="/meals"/>
    }
    else{
      return (
      <Container>
      <Row className="justify-content-md-center">
        <div className="Login">
        <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" size="large">
        <FormControl
        autoFocus
        type="email"
        value={this.state.email}
        onChange={this.handleChange}
        />
        </FormGroup>
        <FormGroup controlId="password" size="large">
        <FormControl
        value={this.state.password}
        onChange={this.handleChange}
        type="password"
        />
        </FormGroup>
        <Button
        block
        size="large"
        disabled={!this.validateForm()}
        type="submit"
        >
        Login
        </Button>
        </form>
        </div>
    </Row>
  </Container>
        );
    }
  }
}
