import React from 'react';
import './App.css';
import SignupForm from './components/SignupForm/SignupForm';
import userService from './utils/userService';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';
import FavoritesListPage from './pages/FavoritesListPage/FavoritesListPage';
import FavoritesListItem from './components/FavoritesListItem/FavoritesListItem';
import Youtube from './api/Youtube';
import * as favoritesService from './utils/favoritesService';
import { Grid } from '@material-ui/core';
import { SearchBar, VideoList, VideoDetail } from './components';

const API_KEY=`${process.env.REACT_APP_YOUTUBE_API_KEY}`

class App extends React.Component {
  state = {
    user: userService.getUser(),
    videos: [],
    selectedVideo: null,
    favorites: []
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
        key: API_KEY,
        q: searchTerm,
      }
    });
    console.log(response.data.items);
    this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
  }

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video })
  }

  handleAddFavorite = async newFavData => {
    console.log(this.state.user, 'user');
    console.log(this.state.favorites, 'favorites');
    const newFav = await favoritesService.create(newFavData);
    this.setState(state => ({
      favorites: [...state.favorites, newFav]
    }),
    () => this.props.history.push('/'));
    console.log(this.state.favorites, 'this favorites state');
  }

  async componentDidMount() {
    this.handleSubmit('javascript');
    const favorites = await favoritesService.getAll();
    this.setState({favorites})
  }

  

render (){
  let isLoggedIn = this.state.user ?
  <div>
    <Grid justify="center" container spacing={10}>
        <Grid item xs={11}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
            <NavBar 
              user={this.state.user} 
              handleLogout={this.handleLogout} 
              />
              {/* <SearchBar onFormSubmit={this.handleSubmit}/> */}
            </Grid>
            <Grid item xs={12}>
            {/* <NavBar user={this.state.user} handleLogout={this.handleLogout} /> */}
              <SearchBar 
              onFormSubmit={this.handleSubmit}
              />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail 
              videos={this.state.selectedVideo} 
              handleAddFavorite={this.handleAddFavorite} 
              favorites={this.state.favorites.filter(f => f.user === this.state.user._id)}
              onVideoSelect={this.onVideoSelect}
              />
            </Grid>
            <Grid item xs={4}>
              <h3 style={{color: 'black', font: 'Roboto'}}>Recommended Videos</h3>
              <VideoList
               videos={this.state.videos}
                onVideoSelect={this.onVideoSelect}
                />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  </div> :
  <div>
    <Grid item xs={12}>
  <NavBar user={this.state.user} handleLogout={this.handleLogout} />
    {/* <SearchBar onFormSubmit={this.handleSubmit}/> */}
  </Grid>
  </div>

  const { selectedVideo, videos } = this.state;
  return (
    <div className="App">
      <div className="title" style={{color: 'black', font: 'Roboto'}}><h1>YouTuber Clone</h1></div>
     
        {/* <FavoritesListPage favorites={this.state.favorites}/> */}


      {/* <NavBar user={this.state.user} handleLogout={this.handleLogout} /> */}
    
      <Switch>
      <Route exact path="/signup" render={() => (
        <SignupForm handleSignupOrLogin={this.handleSignupOrLogin}/>
      )}/>
      <Route exact path="/login" render={() => (
        <LoginPage handleSignupOrLogin={this.handleSignupOrLogin}/>
      )}/>
      {/* <Youtube /> */}
      <Route exact path='/' render={() => (
        isLoggedIn      
      )}/>
    
      </Switch>
    </div>
  );
}
}

  
export default App;