import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth';

import './Navbar.css';

const Navbar = ({ auth: { isAuthenticated, loading }, logout, location }) => {


        const authLinks = (
            <ul id="nav-links">
                <li><Link to="/home" className="nav-link">Home</Link></li>
                <li><Link to="/about" className="nav-link">About</Link></li>
                <li><Link to="/contact" className="nav-link">Contact</Link></li>
                <li><a onClick={logout} href="#!" className="nav-link">Logout</a></li>
            </ul>
        );

        const guestLinks = (
            <ul id="nav-links">
                
                { location.pathname !== '/register' && <li><Link to="/register" className="nav-link">Register</Link></li>}
                { location.pathname !== '/' && <li><Link to="/" className="nav-link">Login</Link></li>}
                <li><Link to="/about" className="nav-link">About</Link></li>
                <li><Link to="/contact" className="nav-link">Contact</Link></li>
            </ul>
        );

        return (
            <nav id="navbar">
                <div id="logo-box">
                    <h1 id="logo">feedMe <i className="fas fa-pizza-slice"></i></h1>               
                </div>
                { !loading && <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment> }
            </nav>
        );
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default withRouter(connect(mapStateToProps, { logout })(Navbar));