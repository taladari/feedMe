import { CONTACT_FORM_SUBMIT } from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const submitContactForm = (name, email, subject, message) => dispatch => {

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({ name, email, subject, message });

        const res = axios.post('/api/contact', body, config);

        dispatch({
            type: CONTACT_FORM_SUBMIT
        });

        dispatch(setAlert('Contact Form Submitted', 'success'));

    } catch (err) {
        console.log(err.message);
    }
};