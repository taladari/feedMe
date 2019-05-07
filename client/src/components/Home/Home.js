import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../Loading/Loading';
import './Home.css';

const Home = ({ user, profile }) => {

        if (profile.loaded && !profile.result) return <Redirect to="/create-profile" />; 

        else if (profile.loaded && profile.result) {
            // show home page
            return (
                <div id="feedme-btn">
                    <p>feed Me</p>
                </div>
            );
        }
        else {
            // show loading animation or something
            return <Loading />
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