import React from 'react';
import { Redirect } from 'react-router-dom'

function IsOwner(props) {
  if (!('access-token' in props.tokenAuthHeaders &&
      'uid' in props.tokenAuthHeaders &&
      props.tokenAuthHeaders.role === "restaurant_owner"))
  {
    return ( <Redirect to="/" /> )
  }
  else{
    return null;
  }
}

export default IsOwner;
