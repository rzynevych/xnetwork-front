import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import Login from './auth/Login';
import './App.css';
import { render } from '@testing-library/react';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.checkIsAuth = this.checkIsAuth.bind(this);
    this.isAuth = this.checkIsAuth();
  }

  checkIsAuth() {
    return true;
  }

  render() {
    if (!this.isAuth) {
      return (
        <Router>
          <Switch>
            <Route exact path="/" render={ (props) => <Login/> }/>
          </Switch>
        </Router>
      );
    } else {
      return (
        <Router>
          <Switch>
            <Route exact path="/" render={ (props) => <MainPage/> }/>
          </Switch>
        </Router>
      )
    }
  }
}

export default App;