import React from 'react';
import './App.css';
import SignupForm from './components/SignupForm/SignupForm';
import userService from './utils/userService';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';
import Youtube from './api/Youtube';
import { Grid } from '@material-ui/core';
import { SearchBar, VideoList, VideoDetail } from './components';

class App extends React.Component {
  state = {
    user: userService.getUser(),
    video: [],
    selectedVideo: null,
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() })
  }

  handleSubmit = async (searchTerm) => {
    const response = await Youtube.get('search', {
      params: {
        part: 'snippet', //<==basically returns all our videos and info to create our <iframe> tags
        maxResults: 5,
        key: 'AIzaSyBy-ctbOJntn7cppzTaXgB_kw95iBnCTZM',
        q: searchTerm,
      }
    });
    console.log(response.data.items);
    this.setState({ video: response.data.items, selectedVideo: response.data.items[0] });
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
      {/* <Youtube /> */}
      <Grid justify="center" container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit}/>
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={this.state.selectedVideo}/>
            </Grid>
            <Grid item xs={4}>
              <VideoList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
}

  
export default App;