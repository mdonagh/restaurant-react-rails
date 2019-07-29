import React from 'react';
import { Button, FormGroup, FormControl, Card, ListGroup, ListGroupItem, Row, Container, Spinner } from "react-bootstrap";
import AccessControl from './AccessControl'

class Restaurant extends React.Component {
    constructor(props) {
    super(props);
    this.state = { isLoaded: false,
                   rating: '',
                   user_comment: '',
                   show_review_form: true,
                   restaurantId: this.props.ownProps.match.params.id };
    this.getRestaurant = this.getRestaurant.bind(this);
    this.createReview = this.createReview.bind(this);
    this.deleteReviewRequest = this.deleteReviewRequest.bind(this);
    this.isAdmin = this.props.tokenAuthHeaders.role === 'admin'
}

  componentDidMount() {
    this._isMounted = true;
    this.getRestaurant();
  }

 componentWillUnmount() {
    this._isMounted = false;
  }

  deleteReviewRequest = async (review_id) => {
    const request = this.props.deleteRequest("/reviews/" + review_id);
    const response = await request;
    this.getRestaurant();
  }

  deleteReview(review_id){
    this.deleteReviewRequest(review_id)
  }

getRestaurant = async () => {
  const request = this.props.getRequest("/restaurants/" + this.state.restaurantId);
  const response = await request;
  if (this._isMounted) {
    this.setState({'isLoaded' : true, restaurant: response.data})
  }
}

 validateForm() {
    return this.state.user_comment.length > 0 && this.state.rating > 0 && this.state.rating < 6
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    this.createReview();
    if (this._isMounted) {
      this.setState({'show_review_form' : false})
    }
    event.preventDefault();
  }

createReview = async () => {
  console.log(this.props)
  let review = { review: {
    rating: this.state.rating,
    user_comment: this.state.user_comment,
    restaurant_id: this.state.restaurant.id
  }}
  const request = this.props.postRequest('/reviews', review);
  const response = await request;
  this.getRestaurant();
}

render () {
let review_form;
if(this.state.show_review_form){
  review_form = (<div className="NewReview">
        <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="rating">
        <FormControl
        onChange={this.handleChange}
        type="rating"
        pattern="[0-9]*" 
        placeholder="Star Rating from 1-5"
        />
        </FormGroup>
        <FormGroup controlId="user_comment">
        <FormControl
        autoFocus
        as="textarea" rows="3"
        type="user_comment"
        onChange={this.handleChange}
        placeholder="user comment"
        />
        </FormGroup>
        <Button
        block
        bsize="large"
        disabled={!this.validateForm()}
        type="submit"
        >
        Leave Comment
        </Button>
        </form>
      </div>)
}
else{
  review_form = (<div>Thank you!</div>)
}

  if(this.state.isLoaded){
    return(
    <Row className="justify-content-md-center">
    <div className="ShowRestaurant">
    <Card>
      <Card.Header>{this.state.restaurant.name}</Card.Header>
      <Card.Body>
        <Card.Title>{this.state.restaurant.address}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Average Rating: {this.state.restaurant.average_rating}</ListGroupItem>
          <ListGroupItem>Highest Rating: {this.state.restaurant.highest_rating}</ListGroupItem>
          <ListGroupItem>Lowest Rating: {this.state.restaurant.lowest_rating}</ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>

    {review_form }
      {
        this.state.restaurant.reviews.map(review => (
          <Card key={review.id} align="start">
            <Card.Header>{review.rating} {review.user_id}</Card.Header>
            <Card.Body>
              <Card.Title>{review.user_comment}</Card.Title>
              <Card.Text>
                {review.owner_reply}
              </Card.Text>
             { this.isAdmin ? <Button
                block
                bsize="small"
                variant="danger"
                onClick={() => this.deleteReview(review.id)}
                >
                Delete
                </Button> : null }
            </Card.Body>
          </Card>
          ))
      }

      </div>
    </Row>
      )
  }
  else{
    return (
    <div className="ShowRestaurant">
    <AccessControl tokenAuthHeaders={this.props.tokenAuthHeaders} />
      <Spinner animation="grow" variant="success" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
  }
}
}

export default Restaurant;
