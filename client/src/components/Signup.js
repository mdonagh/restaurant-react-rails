import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, Row, Container } from "react-bootstrap";
import { Redirect, Link } from 'react-router-dom'

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      role: "0",
      calories: 0
    };
    this.signUp = this.signUp.bind(this);
  }

  validateForm() {
    return true
    // return this.state.email.length > 0 &&
    //         this.state.password.length > 0 &&
    //         (this.state.role === "0" || this.state.role === "1")
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    this.signUp()
    event.preventDefault();
  }

  signUp = async () => {
    let user = { email: this.state.email, 
                 password: this.state.password,
                 role: parseInt(this.state.role),
                 calories: this.state.calories }
    const request = this.props.createAccount(user)
    const response = await request;
    console.log(response)
    console.log(this.state)
  }

  render() {
    if(this.props.tokenAuthHeaders.role){
      return <Redirect to="/home"/>
    }
    else{
      return (
      <Container className="mt-4 mb-4">
      <Row className="justify-content-md-center">
        <div className="Signup">
        <form onSubmit={this.handleSubmit}>
        
        <FormGroup controlId="email" size="large">
        <FormControl
        autoFocus
        type="email"
        placeholder= "email"
        value={this.state.email}
        onChange={this.handleChange}
        />
        </FormGroup>
        
        <FormGroup controlId="password" size="large">
        <FormControl
        value={this.state.password}
        onChange={this.handleChange}
        placeholder= "password"
        type="password"
        />
        </FormGroup>

        <FormGroup controlId="calories" size="large">
        <FormControl
        value={this.state.calories}
        onChange={this.handleChange}
        placeholder= "daily calorie goal"
        />
        </FormGroup>

        <FormGroup controlId="role">
          <FormLabel>I am a...</FormLabel>
          <FormControl 
            as="select"
            value={this.state.role}
            onChange={this.handleChange}
          >
            <option value="0">User</option>
            <option value="1">User Manager</option>
            <option value="2">Admin</option>
          </FormControl>
        </FormGroup>

        <FormGroup>
        <FormLabel>Daily Calorie Goal</FormLabel>
        <Button
        block
        size="large"
        disabled={!this.validateForm()}
        type="submit"
        >
        Sign Up
        </Button>
        </FormGroup>
        Already a user? <Link to="/login"><Button variant="link">Log In</Button></Link>
        </form>
        </div>
    </Row>
  </Container>
        );
    }
  }
}
