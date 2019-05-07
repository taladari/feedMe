import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import './Login.css';

const Login = ({ login, isAuthenticated, user }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        // send action to login and get token
        login(email, password);
    };

    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/home" />;
    }
    
    return (
        <form id="login-form" onSubmit={e => onSubmit(e)}>
            <div id="form-inputs">
                <input type="email" value={email} onChange={e => onChange(e)} className="login-input" id="email" name="email" placeholder="EMAIL" required /> 
                <input type="password" value={password} onChange={e => onChange(e)} className="login-input" id="password" name="password" placeholder="PASSWORD" required />
            </div>
            <input type="submit" value="Login" id="login-submit" />            
        </form>
    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { login })(Login);