import React from 'react';
import IsOwner from './IsOwner'
import OwnerRestaurantsComponent from '../containers/OwnerRestaurants';
import OwnerCommentsComponent from '../containers/OwnerComments';
import { Container } from "react-bootstrap";

class RestaurantOwner extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
      return(
        <Container>
          <IsOwner tokenAuthHeaders={this.props.tokenAuthHeaders} />
          <OwnerRestaurantsComponent />
          <OwnerCommentsComponent />
        </Container>
        )
  }
}

export default RestaurantOwner;
