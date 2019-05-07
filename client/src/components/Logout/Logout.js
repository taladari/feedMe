import React, { useEffect } from 'react';
import { logout } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


const Logout = ({ logout }) => {
    console.log('logout component');
    useEffect(() => {
        logout();
    },[]);

    return <Redirect to="/" />
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(Logout);
