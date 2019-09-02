import React from 'react';
import { Link } from 'react-router-dom'
import { Table, Row, Container, Spinner, Button, Col, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import AccessControl from './AccessControl'
import DatePicker from "react-datepicker";
import TimePicker from 'react-bootstrap-time-picker';

import "react-datepicker/dist/react-datepicker.css";

class Meals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isLoaded: false, meals: [] };
    this.getMeals = this.getMeals.bind(this);
    this.isAdmin = this.props.tokenAuthHeaders.role === 'admin' || this.props.tokenAuthHeaders.role === 'user_manager'
    this.getMeals();
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({'isLoaded' : true})
  }

 componentWillUnmount() {
    this._isMounted = false;
  }

  deleteMealRequest = async (meal_id) => {
    const request = this.props.deleteRequest("/meals/" + meal_id);
    const response = await request;
    this.getMeals();
  }

  setStartDate = (event) => {
    this.setState({
      startDate: event
    });
  }

  setEndDate = (event) => {
    this.setState({
      endDate: event
    });
  }

  setEndTime = event => {
    this.setState({
      endTime: event
    });
    console.log(this.state)
  }

  setStartTime = event => {
    this.setState({
      startTime: event
    });
    console.log(this.state)
  }

  deleteMeal(meal_id){
    this.deleteMealRequest(meal_id)
  }

  handleSubmit = event => {
    this.filterMeals()
    event.preventDefault();
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  filterMeals = async () => {
    console.log(this.state)

    const queryParams = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      endTime: this.state.endTime,
      startTime: this.state.startTime
    }
    const request = this.props.getRequestQuery("/filtered_meals/", queryParams);
    const response = await request;
    if (this._isMounted) {
      this.setState({meals: response.data})
    }
  }

  getMeals = async () => {
    const request = this.props.getRequest('/my_meals');
    const response = await request;
    if (this._isMounted) {
      this.setState({meals: response.data})
    }
  }

render () {
  if(this.state.isLoaded){
    return(
  <Container>
  <Row>
    <Col><Link to="/meal"><Button variant="link">New Meal</Button></Link></Col>
    <form onSubmit={this.handleSubmit}>
      <Col>
        <FormGroup controlId="startDate" size="small">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.setStartDate}
            value={this.state.startDate}
            placeholder="date"
          />
        </FormGroup>
      </Col>
      <Col>
        <FormGroup controlId="end" size="small">
          <DatePicker
            selected={this.state.endDate}
            onChange={this.setEndDate}
            value={this.state.endDate}
            placeholder="date"
          />
        </FormGroup>
      </Col>

      <Col>
        <FormGroup controlId="time">
          <TimePicker 
            autoFocus start="0:00"
            end="24:00"
            step={60}
            onChange={this.setStartTime}
            value={this.state.startTime}
            placeholder="Start Time" 
          />
        </FormGroup>
      </Col>

      <Col>
        <FormGroup controlId="time">
          <TimePicker 
            autoFocus start="0:00"
            end="24:00"
            step={60}
            onChange={this.setEndTime}
            value={this.state.endTime}
            placeholder="End Time" 
          />
        </FormGroup>
      </Col>


      <Col>
        <FormGroup>
        <FormLabel>Daily Calorie Goal</FormLabel>
        <Button
        block
        size="large"
        type="submit"
        >
        Filter
        </Button>
        </FormGroup>
      </Col>
    </form>
    <Col>
          { this.isAdmin ? 
            <Link to="/users">
            <Button variant="link">
            Users
            </Button>
            </Link> : null }
    </Col>
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
              <tr key={meal.id} align="start" className={(meal.met_goal) ? 'table-success' : 'table-danger'}>
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
    )
  }
  else{
    return (
      <div>
      <AccessControl tokenAuthHeaders={this.props.tokenAuthHeaders} />
       <Spinner animation="grow" variant="success" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      </div>
      );
  }
}
}

export default Meals;
