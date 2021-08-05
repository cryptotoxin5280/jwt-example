import React from 'react';
import {Redirect, withRouter} from 'react-router';
import {Route, Switch} from 'react-router-dom';
import AuthRoute from './components/Auth/AuthRoute';
import LoginView from './components/Auth/LoginView';
import AdminView from './components/AdminView';
import DevicesView from './components/DevicesView';
import SoftwareView from './components/SoftwareView';
import NavBar from './components/NavBar';
import TimeOutModal from './components/Modals/TimeOutModal';

const App = () => {
  const getSignedOnName = () => {
    if (window.location.pathname !== '/login') {
      return 'Signed in as: ' + localStorage.getItem('username');
    }
  };

  return (
    <div>
      <NavBar />
      <div className='p-2 text-end'>
        <span>
          {getSignedOnName()}
        </span>
      </div>
      <Switch>
        <Route
          path='/login'
          component={LoginView}
        />
        <AuthRoute
          path='/admin'
          component={AdminView}
        />
        <AuthRoute
          path='/main'
          component={DevicesView}
        />
        <AuthRoute
          path='/software'
          component={SoftwareView}
        />
        <Redirect exact from='/' to='/main' />
      </Switch>
      <TimeOutModal />
    </div>
  );
}

export default withRouter(App);
