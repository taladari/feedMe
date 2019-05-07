import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../utils/isEmpty';
import './Home.css';

const Home = ({ user, profile }) => {

        if (profile.loaded && !profile.result) return <Redirect to="/create-profile" />; 

        else if (profile.loaded && profile.result) {
            // show home page
            return <h1>Home Page - Profile Loaded</h1>;
        }
        else {
            // show loading animation or something
            return <h1>Home Page - Loading</h1>;
        }

        
}

Home.propTypes = {
    user: PropTypes.object.isRequired,
    profie: PropTypes.object
};

const mapStateToProps = state => ({
    user: state.auth.user,
    profile: state.profile
});

export default connect(mapStateToProps)(Home);