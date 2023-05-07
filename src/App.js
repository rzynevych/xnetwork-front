import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import NavBar from './navbar/NavBar';
import MainPage from './pages/MainPage';
import Posts from './pages/Posts';
import UserList from './pages/UserList';
import ChatList from './pages/ChatList';
import Chat from './pages/Chat';
import Login from './auth/Login';
import Registration from './auth/Registration';
import { server_url, ws_url } from './config';
import s from './App.module.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.checkIsAuth = this.checkIsAuth.bind(this);
    this.createWebSocket = this.createWebSocket.bind(this);
    this.webSocketHookAdder = this.webSocketHookAdder.bind(this);
    this.webSocketHooks = [];
    this.state = {
      isAuth : false
    };
    this.user = {};
    this.webSocket = {};
  }

  componentDidMount() {
      this.checkIsAuth();
  }

  checkIsAuth() {
    fetch(server_url + '/authCheck',
      {
        method : 'GET',
        credentials : 'include'
      }
    ).then(response => response.json()).then(json => {
        this.user = json.user;
        this.setState({
          isAuth : json.status
        });
        if (json.status)
          this.createWebSocket(); 
      }).catch(console.log);
  }

  webSocketHookAdder(hook) {
    this.webSocketHooks.push(hook);
  }

  createWebSocket() {
    this.webSocket = new WebSocket(ws_url);
    this.webSocket.onmessage = (e) => {
      let wsMessage = JSON.parse(e.data);
      this.webSocketHooks.forEach(h => {
        if (h.type === wsMessage.type)
          h.hook(wsMessage);
      });
    }
  }

  render() {
    if (!this.state.isAuth) {
      return (
        <Router>
          <Switch>
            <Route exact path="/login" render={(props) => <Login checkIsAuth={this.checkIsAuth}/>}></Route>
            <Route exact path="/registration" render={(props) => <Registration/>}></Route>
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
            <Route exact path='/posts' render={(props) => <Posts user={this.user}/>}/>
            <Route exact path='/userSearch' render={(props) => <UserList user={this.user}/>}/>
            <Route exact path='/chats' render={(props) => <ChatList user={this.user}/>}/>
            <Route exact path='/chat' render={(props) => 
                  <Chat user={this.user} wsHookAdder={this.webSocketHookAdder}/>}/>
            <Redirect to='/posts'/>
          </Switch>
          </div>
        </Router>
      )
    }
  }
}

export default App;