import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import * as pages from './pages';

import { auth } from './lib/auth';

import './App.css';

function App() {
  return (
    <div className='App'>
      <nav className='Nav'>
        {auth.isLoggedIn() ? (
          <>
            <span
              className='LogoutButton NavItem'
              onClick={() => {
                auth.logout();
                window.location.reload();
              }}
            >
              Logout
            </span>
            <span className='NavItem'>Logged in as {auth.getEmail()}</span>
          </>
        ) : (
          <>
            <Link className='NavItem' to='/signup'>
              Signup
            </Link>
            <Link className='NavItem' to='/login'>
              Login
            </Link>
          </>
        )}
      </nav>
      {auth.isLoggedIn() ? (
        <Switch>
          <Route exact path='/login' render={() => <Redirect to='/' />} />
          <Route
            path='/'
            render={props => <pages.Home {...props} auth={auth} />}
          />
        </Switch>
      ) : (
        <Switch>
          <Route
            exact
            path='/signup'
            render={props => <pages.Signup {...props} auth={auth} />}
          />
          <Route
            exact
            path='/login'
            render={props => <pages.Login {...props} auth={auth} />}
          />
          <Route path='/' render={() => <Redirect to='/login' />} />
        </Switch>
      )}
    </div>
  );
}

export default App;
