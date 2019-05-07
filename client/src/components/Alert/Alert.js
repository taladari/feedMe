import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Alert.css'


const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && (
    <div className={`alert alert-${ alerts[0].alertType }`}>
        { alerts[0].msg }
    </div>
);

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);