import React, { Component } from "react";
import { Button, FormGroup, FormControl, Container, Row } from "react-bootstrap";
import { Redirect} from 'react-router-dom'
import AccessControl from './AccessControl'
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Meal extends Component {
  constructor(props) {
    super(props);
    this.createMeal = this.createMeal.bind(this);
    this.getMeal = this.getMeal.bind(this);
    this.updateMeal = this.updateMeal.bind(this);
   
    this.state = {
        time: 63000,
        text: "",
        date: new Date(),
        redirect: false
    };     

    if(this.props.ownProps.match.params.id){
      this.state = {};
      this.getMeal(this.props.ownProps.match.params.id);
    }
  }

updateMeal = async () => {
  let meal = { meal: {
    time: this.state.time,
    text: this.state.text,
    date: this.state.date,
    calories: this.state.calories
  }}

  const request = this.props.putRequest("/meals/" + this.props.ownProps.match.params.id, meal);
  const response = await request;
}

getMeal = async (id) => {
  const request = this.props.getRequest("/meals/" + id);
  const response = await request;
  console.log(response)
    this.setState({
      time: response.data.time,
      text: response.data.text,
      date: new Date(response.data.date),
      calories: response.data.calories
    });
}

createMeal = async () => {
  console.log(this.props)
  let meal = { meal: {
    time: this.state.time,
    text: this.state.text,
    date: this.state.date,
    calories: this.state.calories
  }}
  console.log(meal)
  const request = this.props.postRequest('/meals', meal);
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

  setDate = event => {
    this.setState({
      date: event
    });
    console.log(this.state)
  }

  setTime = event => {
    this.setState({
      time: event
    });
    console.log(this.state)
  }

  handleSubmit = event => {
    if(this.props.ownProps.match.params.id){
      this.updateMeal();
    }
    else{
      this.createMeal();
    }
    
    this.setState(() => ({
      redirect: true
    }));
    event.preventDefault();
  }

  render() {
    if(this.state.redirect){
      return <Redirect to="/meals"/>
    }
    else{
      return (
      <Container className="mt-4 mb-4">
      <Row className="justify-content-md-center">
        <AccessControl tokenAuthHeaders={this.props.tokenAuthHeaders} />
        <form onSubmit={this.handleSubmit}>

        <FormGroup controlId="time">
          <TimePicker 
            autoFocus start="3:00"
            end="24:00"
            step={30}
            onChange={this.setTime}
            value={this.state.time}
            placeholder="12:00" 
          />
        </FormGroup>

        <FormGroup controlId="text">
          <FormControl
            as="textarea"
            rows="3"
            onChange={this.handleChange}
            value={this.state.text}
            type="text"
            placeholder="text"
          />
        </FormGroup>

        <FormGroup controlId="calories">
          <FormControl
            onChange={this.handleChange}
            type="number"
            value={this.state.calories}
            placeholder="text"
          />
        </FormGroup>

        <FormGroup controlId="date">
          <DatePicker
            selected={this.state.date}
            onChange={this.setDate}
            value={this.state.date}
            placeholder="date"
          />
        </FormGroup>
        <Button
          block
          size="large"
          disabled={!this.validateForm()}
          type="submit"
        >
        Create Meal
        </Button>
        </form>
        </Row>
        </Container>
        );
    }
  }
}
