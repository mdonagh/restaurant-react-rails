import React from 'react';
import { Link } from 'react-router-dom'
import { Table, Row, Container, Spinner, Button } from "react-bootstrap";
import AccessControl from './AccessControl'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isLoaded: false };
    this.getRestaurants = this.getRestaurants.bind(this);
    this.isAdmin = this.props.tokenAuthHeaders.role === 'admin'
    this.getRestaurants();
  }

  componentDidMount() {
    this._isMounted = true;
  }

 componentWillUnmount() {
    this._isMounted = false;
  }

  deleteRestaurantRequest = async (restaurant_id) => {
    const request = this.props.deleteRequest("/restaurants/" + restaurant_id);
    const response = await request;
    this.getRestaurants();
  }

  deleteRestaurant(restaurant_id){
    this.deleteRestaurantRequest(restaurant_id)
  }

  getRestaurants = async () => {
    const request = this.props.getRequest('/restaurants');
    const response = await request;
    if (this._isMounted) {
      this.setState({'isLoaded' : true, restaurants: response.data})
    }
  }

render () {
  if(this.state.isLoaded){
    return(
      <Container>
      <Row className="justify-content-md-center">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Average Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.restaurants.map(restaurant => (
              <tr key={restaurant.id} align="start">
              <td><Link to={"/restaurant/" + restaurant.id}>{restaurant.name}</Link></td>
              <td>{restaurant.average_rating}</td>
              <td>
          { this.isAdmin ? <Button
            block
            bsize="small"
            variant="danger"
            onClick={() => this.deleteRestaurant(restaurant.id)}
            >
            Delete
            </Button> : null }
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

export default Home;
