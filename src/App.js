import React from 'react';
import './App.css';
import SignupForm from './components/SignupForm/SignupForm';
import userService from './utils/userService';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';

class App extends React.Component {
  state = {
    user: userService.getUser()
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() })
  }
  

render (){
  return (
    <div className="App">
      <div className="title">YouTuber Clone</div>
      <NavBar user={this.state.user} handleLogout={this.handleLogout} />
      <Route path="/signup" render={(props) => (
        <SignupForm handleSignupOrLogin={this.handleSignupOrLogin}/>
      )}/>
      <Route path="/login" render={(props) => (
        <LoginPage handleSignupOrLogin={this.handleSignupOrLogin}/>
      )}/>

    </div>
  );
}
}

  
export default App;