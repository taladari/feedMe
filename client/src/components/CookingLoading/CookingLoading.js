import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './CookingLoading.scss'


const CookingLoading = () => {
    return (
        <div id="container">
            <h2 id="loading-title">Cooking in progress..</h2>
            <div id="cooking">
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div id="area">
                    <div id="sides">
                        <div id="pan">

                        </div>
                        <div id="handle">

                        </div>
                    </div>
                    <div id="pancake">
                        <div id="pastry"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect()(CookingLoading);