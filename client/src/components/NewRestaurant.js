import React, { Component } from "react";
import { Button, FormGroup, FormControl, Container, Row } from "react-bootstrap";
import { Redirect} from 'react-router-dom'
import AccessControl from './AccessControl'

export default class NewRestaurant extends Component {
  constructor(props) {
    super(props);
    this.createRestaurant = this.createRestaurant.bind(this);

    this.state = {
        name: "",
        address: "",
        description: "",
        redirect: false
    };
  }

createRestaurant = async () => {
  console.log(this.props)
  let restaurant = { restaurant: {
    name: this.state.name,
    address: this.state.address,
    description: this.state.description
  }}
  const request = this.props.postRequest('/restaurants', restaurant);
  const response = await request;
}

  validateForm() {
    return this.state.name.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    this.createRestaurant();
    this.setState(() => ({
      redirect: true
    }));
    event.preventDefault();
  }

  render() {
    if(this.state.redirect){
      return <Redirect to="/owner"/>
    }
    else{
      return (
      <Container className="mt-4 mb-4">
      <Row className="justify-content-md-center">
        <AccessControl tokenAuthHeaders={this.props.tokenAuthHeaders} />
        <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="name">
        <FormControl
        autoFocus
        type="name"
        onChange={this.handleChange}
        placeholder="name"
        />
        </FormGroup>
        <FormGroup controlId="address">
        <FormControl
        as="textarea"
        rows="3"
        onChange={this.handleChange}
        type="address"
        placeholder="address"
        />
        </FormGroup>
        <FormGroup controlId="description">
        <FormControl
        as="textarea" rows="3"
        onChange={this.handleChange}
        type="description"
        placeholder="description"
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
        </Row>
        </Container>
        );
    }
  }
}
