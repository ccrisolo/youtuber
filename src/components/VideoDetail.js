import React from 'react';

import { Paper, Typography } from '@material-ui/core';
import FavoritesListPage from '../pages/FavoritesListPage/FavoritesListPage';
import FavoritesListItem from './FavoritesListItem/FavoritesListItem';

const VideoDetail = ({videos, handleAddFavorite}) => {
    if(!videos) return <div>Loading...</div>

    console.log(videos.id.videoId);
    console.log(videos.id);
    console.log(videos);
    console.log('videoId')

    const videoSrc = `https://www.youtube.com/embed/${videos.id.videoId}`

    return(
        <React.Fragment>
            <Paper elevation={6} style={{height: '60%'}}>
                <iframe frameBorder="0" height="100%" width="100%" title="Video Player" src={videoSrc}/>
            </Paper>
            <h1>test</h1>
            <Paper elevation={6} style={{padding: '15px'}}>
                <Typography variant="h4">{videos.snippet.title} - {videos.snippet.channelTitle}</Typography>
                <Typography variant="subtitle1">{videos.snippet.channelTitle}</Typography>
                <Typography variant="subtitle2">{videos.snippet.description}</Typography>
                <h1>test2</h1>
                {/* <p>{videos}</p> */}
            </Paper>
            <div>
                {/* need a form that has youtube url(const videosrc), youtube apiId of video, userId */}
                {/* button onsubmit util func 'createFavorite function' to be found in utils folder */}
                
                <button onClick={() => handleAddFavorite({videoId: videos.id.videoId})}>Add to Favorites</button>
                <FavoritesListItem />
            </div>
        </React.Fragment>
    )
}

export default VideoDetail;