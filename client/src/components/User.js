import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, Container, Row } from "react-bootstrap";
import { Redirect} from 'react-router-dom'
import AccessControl from './AccessControl'
import "react-datepicker/dist/react-datepicker.css";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.createUser = this.createUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
   
    this.state = {
        email: "",
        calories: "",
        role: "",
        password: "",
        redirect: false
    };     

    if(this.props.ownProps.match.params.id){
      this.state = {};
      this.getUser(this.props.ownProps.match.params.id);
    }
  }

updateUser = async () => {
  let user = { user: {
    email: this.state.email,
    calories: this.state.calories,
    role: this.state.role
  }}

  const request = this.props.putRequest("/users/" + this.props.ownProps.match.params.id, user);
  const response = await request;
}

getUser = async (id) => {
  const request = this.props.getRequest("/users/" + id);
  const response = await request;
  console.log(response)
    this.setState({
      email: response.data.email,
      calories: response.data.calories,
      password: response.data.password,
      role: response.data.role
    });
}

createUser = async () => {
  console.log(this.props)
  let user = { user: {
    email: this.state.email,
    calories: this.state.calories,
    role: this.state.role,
    password: this.state.password
  }}
  console.log(user)
  const request = this.props.postRequest('/users', user);
  const response = await request;
}

  validateForm() {
    return true
    console.log(this.state)
    // return this.state.time.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(this.state)
  }

  handleSubmit = event => {
    if(this.props.ownProps.match.params.id){
      this.updateUser();
    }
    else{
      this.createUser();
    }
    
    this.setState(() => ({
      redirect: true
    }));
    event.preventDefault();
  }

  render() {
   if(this.state.redirect){
      return <Redirect to="/users"/>
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
          <FormLabel>Role</FormLabel>
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
        </form>
        </div>
    </Row>
  </Container>
        );
    }
  }
}
