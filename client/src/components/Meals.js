import React from 'react';
import { Link } from 'react-router-dom'
import { Table, Row, Container, Spinner, Button, Col } from "react-bootstrap";
import AccessControl from './AccessControl'

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

  deleteMeal(meal_id){
    this.deleteMealRequest(meal_id)
  }

  getMeals = async () => {
    const request = this.props.getRequest('/meals');
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
