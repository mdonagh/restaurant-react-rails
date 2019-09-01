import React, { Component } from "react";
import { Button, FormGroup, FormControl, Container, Row, Card, ListGroup, ListGroupItem, Table, Spinner } from "react-bootstrap";
import { Redirect, Link } from 'react-router-dom'
import AccessControl from './AccessControl'
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from "react-datepicker";
import MealsContainer from '../containers/Containers';

import "react-datepicker/dist/react-datepicker.css";

export default class Meal extends Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
    this.getMeals = this.getMeals.bind(this);
    console.log(this.props)
    this.state = {
        email: "",
        calories: "",
        role: "",
        isLoaded: false,
        user_id: this.props.ownProps.match.params.id
                 };
  this.getUser();
  this.getMeals();
  
  }

componentDidMount() {
  this._isMounted = true;
}

componentWillUnmount() {
  this._isMounted = false;
}

deleteMealRequest = async (meal_id) => {
  const request = this.props.deleteRequest("/meals/" + meal_id);
  const response = await request;
  this.getMeals();
}

deleteMeal(meal_id){
  this.deleteMealRequest(meal_id)
}

getMeals = async () => {
  const request = this.props.getRequest('/meals_for_user/' + this.state.user_id);
  const response = await request;
  console.log(response)
  if (this._isMounted) {
    this.setState({meals: response.data, 'isLoaded' : true})
  }
}

getUser = async () => {
  const request = this.props.getRequest("/users/" + this.state.user_id);
  const response = await request;
  console.log(response)
    this.setState({
      email: response.data.email,
      calories: response.data.calories,
      role: response.data.role
    });
}

  render() {
  if(this.state.isLoaded){
      return (
      <Container className="mt-4 mb-4">
      <Row className="justify-content-md-center">
    <Card>
      <Card.Header>{this.state.email}</Card.Header>
      <Card.Body>
        <Card.Title>Calorie Goal: {this.state.calories}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Role: {this.state.role}</ListGroupItem>
             <Link to={"/user-edit/" + this.state.user_id}>
             <Button
                block
                bsize="small"
                variant="warning"
              >
              Edit User
              </Button>
              </Link>
        </ListGroup>
      </Card.Body>
    </Card>
      </Row>
      <Row className="justify-content-md-center">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Text</th>
                <th>Date</th>
                <th>Time</th>
                <th>Calories</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.meals.map(meal => (
                  <tr key={meal.id} align="start">
                  <td><Link to={"/meal/" + meal.id}>{meal.text}</Link></td>
                  <td>{meal.date}</td>
                  <td>{new Date(meal.time * 1000).toISOString().substr(11, 8)}</td>
                  <td>{meal.calories}</td>
                  <td>
                  <Link to={"/meal-edit/" + meal.id}>
                  <Button
                    block
                    bsize="small"
                    variant="warning"
                  >
                  Edit
                  </Button>
                  </Link>
                  <Button
                    block
                    bsize="small"
                    variant="danger"
                    onClick={() => this.deleteMeal(meal.id)}
                  >
                  Delete
                  </Button>
                </td>
                  </tr>
                  ))
              }
            </tbody>
          </Table>
        </Row>
      </Container>
        );
    }
else{
    return (
      <div>
       <Spinner animation="grow" variant="success" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      </div>
      );
}
}
}
