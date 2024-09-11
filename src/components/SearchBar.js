import React from "react";
import { Paper, TextField, withStyles } from "@material-ui/core";

class   SearchBar extends React.Component {
    state = {
        searchTerm: "",
    };

    handleChange = event => {
        this.setState({ searchTerm: event.target.value });
    };

    handleSubmit = event => {
        const { searchTerm } = this.state;
        const { onFormSubmit } = this.props;

        onFormSubmit(searchTerm);

        event.preventDefault();
    };

    render() {
        return (
            <Paper
                elevation={12}
                style={{
                    padding: "0px",
                    marginTop: "10px",
                    fontColor: "white",
                }}
            >
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        fullWidth
                        label='Search YouTube...'
                        variant='outlined'
                        onChange={this.handleChange}
                    />
                </form>
            </Paper>
        );
    }
}

export default SearchBar;
