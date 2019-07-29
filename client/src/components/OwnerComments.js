import React from 'react';
import { Link } from 'react-router-dom'
import { Table, Row, Container, Button, Card, FormGroup, FormControl, Spinner } from "react-bootstrap";
import IsOwner from './IsOwner'

class OwnerComments extends React.Component {
  constructor(props) {
    super(props);
    console.log('got to owner dashboard')
    this.state = { count: 0, isLoaded: false, owner_reply: '' };
    this.getPendingReviews = this.getPendingReviews.bind(this);
    this.updateReviewWithReply = this.updateReviewWithReply.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getPendingReviews();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  validateForm() {
    return this.state.owner_reply.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  setReviewId(review_id){
    this.setState({
      review_id: review_id
    });
  }

  handleSubmit = event => {
    console.log(this.state)
    this.updateReviewWithReply()
    event.preventDefault();
  }

  updateReviewWithReply = async () => {
    const request = this.props.patchRequest("/reviews/" + this.state.review_id, { review: {owner_reply: this.state.owner_reply } });
    const response = await request;
    if (this._isMounted) {
      this.setState({'isLoaded' : false })
    }
    this.getPendingReviews();
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
        {
          this.state.reviews.map(review => (
            <Card style={{ width: '18rem' }} key={review.id}>
            <Card.Body>
            <Card.Title>{review.restaurant.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{review.user.email}</Card.Subtitle>
            <Card.Text>
            {review.user_comment}
            </Card.Text>

            <div className="NewReply">
            <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="owner_reply">
            <FormControl
            autoFocus
            as="textarea" rows="3"
            type="owner_reply"
            onChange={this.handleChange}
            placeholder="your reply"
            />
            </FormGroup>
            <Button
            block
            bsize="large"
            onClick={() => this.setReviewId(review.id)}
            disabled={!this.validateForm()}
            type="submit"
            >
            Reply to Review
            </Button>
            </form>
            </div>

            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
            </Card>
            ))
        }
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

export default OwnerComments;
