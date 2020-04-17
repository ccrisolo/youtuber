import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import VideoItem from './VideoItem';

//dummy component
const VideoList = ({ videos, onVideoSelect }) => {
    const listOfVideos = videos.map((video, id) => <VideoItem onVideoSelect={onVideoSelect} key={id} video={video}/>)
    return (
        <Grid container spacing={5}>
                {listOfVideos}
        </Grid>
        )
    }


export default VideoList;