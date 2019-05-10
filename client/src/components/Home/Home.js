import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../Loading/Loading';
import { withRouter } from 'react-router-dom';
import './Home.css';

const Home = ({ user, profile, history }) => {

    const onFeedmeClick = (e) => {
        history.push('/suggestions');
    }

    if (profile.loaded && !profile.result) return <Redirect to="/create-profile" />; 

    else if (profile.loaded && profile.result) {
        // show home page
        return (
            <div id="feedme-btn" onClick={ onFeedmeClick }>
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
    user: PropTypes.object,
    profie: PropTypes.object
};

const mapStateToProps = state => ({
    user: state.auth.user,
    profile: state.profile
});

export default withRouter(connect(mapStateToProps)(Home));