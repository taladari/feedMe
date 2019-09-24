import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Register.css';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { ALL, VEGAN, GLUTEN_FREE } from '../../utils/preferences';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [preference, setPreference] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        }
        else {
            register(name, email, password, preference);
        }
    };

    const onPick = e => {
        setPreference(parseInt(e.target.value));
    }
    if (isAuthenticated) return <Redirect to="/home" />

    return (
        <form id="register-form" onSubmit={e => onSubmit(e)}>
            <div id="form-inputs">
                <input type="text" className="register-input" value={name} id="name" name="name" placeholder="NAME" onChange={e => onChange(e)} required /> 
                <input type="email" className="register-input" value={email} id="email" name="email" placeholder="EMAIL" onChange={e => onChange(e)} required /> 
                <input type="password" className="register-input" value={password} id="password" name="password" placeholder="PASSWORD" onChange={e => onChange(e)} required minLength='4'/>
                <input type="password" className="register-input" value={password2} id="password2" name="password2" placeholder="CONFIRM PASSWORD" onChange={e => onChange(e)} required minLength='4'/>
                <h3 className="headline">Special Preference:</h3>
                <label className="container">All
                    <input onChange={onPick} type="radio" name="radio" value={ALL}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">Vegan
                    <input onChange={onPick} type="radio" name="radio" value={VEGAN}/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">Gluten Free
                    <input onChange={onPick} type="radio" name="radio" value={GLUTEN_FREE}/>
                    <span className="checkmark"></span>
                </label>
            </div>

            <input type="submit" value="Register" id="register-submit" />            
        </form>
    );
}

Register.propTypes = {
    setAlert:   PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);