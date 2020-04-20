import React from 'react';
import { Paper, TextField } from '@material-ui/core';

class SearchBar extends React.Component {
    state = {
        searchTerm: '',
    }

    handleChange = (event) => {
        this.setState({searchTerm: event.target.value})
    }

    handleSubmit = (event) => {
        const { searchTerm } = this.state;
        const { onFormSubmit } = this.props;

        onFormSubmit(searchTerm);

        event.preventDefault();
    }

    render(){
        return(
            <Paper elevation={12} style={{ padding: '60px', marginTop: '10px', backgroundColor:'lightgrey', fontColor:'white'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField fullWidth label="Search YouTube..." onChange={this.handleChange}/>
                </form>
            </Paper>
        )
    }
}

export default SearchBar;