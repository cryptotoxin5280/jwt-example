import React from 'react';
import {Redirect} from 'react-router';
import {Route} from 'react-router-dom';

const AuthRoute = (props) => {

  const isAuthenticated = () => {
    const authToken = localStorage.getItem('authToken');

    if(!authToken) {
      return false;
    }
    return true;
  };

  if (isAuthenticated()) {
    return (
      <Route
        component={props.component}
        path={props.path}
      />
    )
  }
  else {
    return (
      <Redirect
        to='/login'
      />
    );
  }
};

export default AuthRoute;
