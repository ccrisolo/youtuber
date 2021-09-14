import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
    let nav = props.user ? (
        <div className='navbar-container'>
            <span className='NavBar-welcome'>WELCOME, {props.user.name}</span>
            <Link to='' onClick={props.handleLogout} className='NavBar-link'>
                LOG OUT
            </Link>
        </div>
    ) : (
        <div>
            <Link to='/login' className='NavBar-link'>
                LOG IN
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/signup' className='NavBar-link'>
                SIGN UP
            </Link>
        </div>
    );
    return (
        <div className='NavBar'>
            <h1 id='title'>YouTube Clone</h1>
            <div style={{display: 'flex', flexDirection: 'row', alignItems:'center' }}>{nav}</div>
        </div>
    );
};

export default NavBar;
