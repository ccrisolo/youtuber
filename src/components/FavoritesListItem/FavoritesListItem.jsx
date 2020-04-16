import React from 'react';
import {Link} from 'react-router-dom';


function FavoritesListItem ({favorite, handleDeleteFavorite}) {
    return (
        <div className='panel panel-default'>
            <div className='panel-heading'>
                <h3 className='panel-title'>{favorite}</h3>
                <h1>favorite item</h1>



            </div>
        </div>
    );

}

export default FavoritesListItem;