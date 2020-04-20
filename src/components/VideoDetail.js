import React from 'react';

import { Paper, Typography, Grid } from '@material-ui/core';
import FavoritesListPage from '../pages/FavoritesListPage/FavoritesListPage';
import FavoritesListItem from './FavoritesListItem/FavoritesListItem';

const VideoDetail = ({videos, handleAddFavorite, favorites, onVideoSelect, handleDeleteFavorite}) => {
    if(!videos) return <div>Loading...</div>

    console.log(favorites, 'this is favorites');
    console.log(videos, 'this is videos');
  

    const videoSrc = `https://www.youtube.com/embed/${videos.id.videoId}`
    const listOfFavorites = favorites.map(favorite => 
        <FavoritesListItem 
            favorite={favorite} 
            onVideoSelect={onVideoSelect}
            handleDeleteFavorite={handleDeleteFavorite}

        />
        
    )
    return(
        <React.Fragment>
            <Paper elevation={6} style={{height: '60vh', width: '60vw'}}>
                <iframe frameBorder="0" height="100%" width="100%" title="Video Player" src={videoSrc}/>
            </Paper>
           <br></br>
            <Paper elevation={24} style={{padding: '15px' }}>
                <Typography variant="h4">{videos.snippet.title} - {videos.snippet.channelTitle}</Typography>
                <h3>Channel Title:</h3>
                <Typography style={{color: 'gray'}} variant="subtitle1">{videos.snippet.channelTitle}</Typography>
                <h3>Description:</h3>
                <Typography variant="subtitle2">{videos.snippet.description}</Typography>
                {/* <p>{videos}</p> */}
            </Paper>
            <div>
                {/* need a form that has youtube url(const videosrc), youtube apiId of video, userId */}
                {/* button onsubmit util func 'createFavorite function' to be found in utils folder */}
                
                <button onClick={() => handleAddFavorite({
                    videoId: videos.id.videoId, 
                    thumbnail: videos.snippet.thumbnails.medium.url,
                    title: videos.snippet.title,
                    channelTitle: videos.snippet.channelTitle,
                    description: videos.snippet.description
                    })}>Add to Favorites</button>
                 <h2 className='favoritesListHeading' style={{color: 'black', font: 'Roboto'}}>Favorites List</h2>   
                
            </div>
            <Grid container spacing={5}>
            {listOfFavorites}
            </Grid>
        </React.Fragment>
    )
}

export default VideoDetail;