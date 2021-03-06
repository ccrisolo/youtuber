import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import userService from '../../utils/userService';


class LoginPage extends Component {
  
  state = {
    email: '',
    pw: ''
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
}

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.login(this.state)
      // Update to call login instead of signup
            this.props.handleSignupOrLogin();
            this.setState({
              email: '',
              pw: '',
          })
          this.props.history.push('/')

      
        } catch (err) {
      // Use a modal or toast in your apps instead of alert
      console.log(err);
        alert('Invalid Credentials!');
        }
    }
  

  render() {
    return (
      <div className="LoginPage">
        <header className="header-footer"></header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
            <h1 id='logInTitle'>Log In</h1>
              <input style={{width: 300, height: 30}}type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input style={{width: 300, height: 30}} type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default">Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/' variant="inherit" style={{color: 'rgba(223, 0, 0, 0.5)', fontFamily: 'sans-serif', textDecoration: 'none', padding: '10px 22px', border: 'solid', borderRadius: '25px'}}>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginPage);