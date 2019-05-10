import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth';

import './Navbar.css';

const Navbar = ({ auth: { isAuthenticated, loading }, logout, location }) => {

    const { pathname } = location;

    let authLinks = (
        <ul id="nav-links">
           { pathname !== '/create-profile' && <li>
                <Link to="/home" className={ pathname === '/home' ? "nav-link current" : "nav-link" }>
                    Home
                </Link>
           </li> }
           { pathname !== '/create-profile' && <li>
                <Link to="/about" className={ pathname === '/about' ? "nav-link current" : "nav-link" }>
                    About
                </Link>
            </li> }
            { pathname !== '/create-profile' && <li>
                <Link to="/contact" className={ pathname === '/contact' ? "nav-link current" : "nav-link" }>
                    Contact
                </Link>
            </li> }
            <li>
                <Link to="/logout" className="nav-link">
                    Logout
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul id="nav-links">
            
            { pathname !== '/register' && <li><Link to="/register" className="nav-link">Register</Link></li> }
            { pathname !== '/' && <li><Link to="/" className="nav-link">Login</Link></li> }
            <li>
                <Link to="/about" className={ pathname === '/about' ? "nav-link current" : "nav-link" }>
                    About
                </Link>
            </li>
            <li>
                <Link to="/contact" className={ pathname === '/contact' ? "nav-link current" : "nav-link" }>
                    Contact
                </Link>
            </li>
        </ul>
    );

    return (
        <nav id="navbar">
            <div id="logo-box">
                <Link to="/" id="logo">feedMe <i className="fas fa-pizza-slice"></i></Link>               
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