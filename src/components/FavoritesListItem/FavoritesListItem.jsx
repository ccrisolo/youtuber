import React from 'react';
import {Link} from 'react-router-dom';
import { Grid, Paper, Typography } from '@material-ui/core';


function FavoritesListItem ({favorite, onVideoSelect, handleDeleteFavorite}) {
    return(
        
        <Grid item xs={12}>
            <Paper elevation={12} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => onVideoSelect(favorite)}>
                <img style={{ marginRight: '20px' }} alt="thumbnail" src={favorite.thumbnail}/>
                <Typography variant="subtitle1"><b>{favorite.title}</b></Typography>
            </Paper>
                <button
                className='btn btn-xs btn-danger margin-left-10'
                onClick={() => handleDeleteFavorite(favorite._id)}
                >Delete</button>
        </Grid>
        
    )
}

export default FavoritesListItem;