import React, { Component } from "react";
import { Button, FormGroup, FormControl, Container, Row, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Redirect} from 'react-router-dom'
import AccessControl from './AccessControl'
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from "react-datepicker";
import MealsContainer from '../containers/Containers';

import "react-datepicker/dist/react-datepicker.css";

export default class Meal extends Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
    this.state = {
        email: "",
        calories: "",
        role: "",
        redirect: false
                 };
  }

getUser = async (id) => {
  const request = this.props.getRequest("/users/" + id);
  const response = await request;
  console.log(response)
    this.setState({
      email: response.data.email,
      calories: response.data.calories,
      role: response.data.role
    });
}

  render() {
      return (
      <Container className="mt-4 mb-4">
      <Row className="justify-content-md-center">
    <Card>
      <Card.Header>{this.state.email}</Card.Header>
      <Card.Body>
        <Card.Title>Calorie Goal: {this.state.calories}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Role: {this.state.role}</ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
      </Row>
      <MealsContainer />
      </Container>
        );
    }
}
