import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import NavBar from './includes/NavBar';
import MainPage from './pages/MainPage';
import Posts from './pages/Posts';
import Login from './auth/Login';
import { url } from './config';
import s from './App.module.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.checkIsAuth = this.checkIsAuth.bind(this);
    this.isAuth = false;
  }

  componentDidMount() {
    this.checkIsAuth();
  }

  checkIsAuth() {
    fetch(url + '/auth_check',
      {
        method : 'GET',
        credentials : 'include'
      }
    ).then(response => response.json()).then(json => {
        this.isAuth = json.status;
        this.forceUpdate();
      })
  }

  render() {
    if (!this.isAuth) {
      return (
        <Router>
          <Switch>
            <Route exact path="/login" render={(props) => <Login checkIsAuth={this.checkIsAuth}/>}></Route>
            <Redirect to='/login'/>
          </Switch>
        </Router>
      );
    } else {
      return (
        <Router>
          <div className={s.main__container}>
          <NavBar/>
          <Switch>
            <Route exact path='/posts' component={Posts}></Route>
            <Redirect to='/posts'/>
          </Switch>
          </div>
        </Router>
      )
    }
  }
}

export default App;