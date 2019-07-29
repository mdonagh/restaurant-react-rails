import React from 'react';
import { Redirect } from 'react-router-dom'

function AccessControl(props) {
  if (!('access-token' in props.tokenAuthHeaders &&
      'uid' in props.tokenAuthHeaders &&
      'role' in props.tokenAuthHeaders))
  {
    return ( <Redirect to="/" /> )
  }
  else{
    return null;
  }
}

export default AccessControl;
