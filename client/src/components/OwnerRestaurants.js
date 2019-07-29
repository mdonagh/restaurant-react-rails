import React from 'react';
import { Link } from 'react-router-dom'
import { Table, Row, Container, Button, Card, FormGroup, FormControl, Spinner } from "react-bootstrap";
import IsOwner from './IsOwner'

class OwnerRestaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isLoaded: false };
    this.getRestaurantsForOwner = this.getRestaurantsForOwner.bind(this);
  }

  getRestaurantsForOwner = async () => {
    const request = this.props.getRequest('/owner_restaurants');
    const response = await request;
    if (this._isMounted) {
      this.setState({'isLoaded' : true, restaurants: response.data})
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.getRestaurantsForOwner();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getPendingReviews = async () => {
    const request = this.props.getRequest('/reviews/pending_owner_reply');
    const response = await request;
    if (this._isMounted) {
      this.setState({reviews: response.data, 'isLoaded' : true })
    }
  }

  render () {
    if(this.state.isLoaded){
      return(
        <Row className="justify-content-md-center">
        <Link to="/new-restaurant"><Button variant="link">Add a Restaurant</Button></Link>
        <Table striped bordered hover>
        <thead>
        <tr>
        <th>Name</th>
        <th>Average Rating</th>
        </tr>
        </thead>
        <tbody>
        {
          this.state.restaurants.map(restaurant => (
            <tr key={restaurant.id} align="start">
            <td><Link to={"/restaurant/" + restaurant.id}>{restaurant.name}</Link></td>
            <td>{restaurant.average_rating}</td>
            </tr>
            ))
        }
        </tbody>
        </Table>
        </Row>
        )
    }
    else{
      return (
        <div>
        <IsOwner tokenAuthHeaders={this.props.tokenAuthHeaders} />
        <Spinner animation="grow" variant="success" role="status">
        <span className="sr-only">Loading...</span>
        </Spinner>
        </div>
        );
    }
  }
}

export default OwnerRestaurants;
