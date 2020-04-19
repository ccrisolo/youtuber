import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import userService from '../../utils/userService'

class SignupForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    } 
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        console.log('hitting');
        try {
            await userService.signup(this.state)
            this.props.handleSignupOrLogin();
            this.setState({
                name: '',
                email: '',
                password: '',
            })
            this.props.history.push('/');

        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
           
                <h1 id='signUpTitle'>Sign Up</h1>
                <input className='signupInput' value={this.state.name} type='text' name='name' placeholder='Name' onChange={this.handleChange}/>
                <input className='signupInput' value={this.state.email}  type='email' name='email' placeholder='Email' onChange={this.handleChange} />
                <input className='signupInput' value={this.state.password}  type='password' name='password' placeholder='Password' onChange={this.handleChange} />
                <input id='signupbtn'type='submit'></input>
            </form>
            </div>
        )
    }
}
export default withRouter(SignupForm);