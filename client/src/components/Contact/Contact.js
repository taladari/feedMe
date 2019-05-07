import React, { useState } from 'react';
import { submitContactForm } from '../../actions/contact';
import { connect } from 'react-redux';
import './Contact.css';

const Contact = ({ submitContactForm }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const { name, email, subject, message } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        submitContactForm(name, email, subject, message);

        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div id="contact">
            <h1 id="contact-title">Contact Us</h1>
            <form id="contact-form" onSubmit={e => onSubmit(e)}>
                <div id="form-inputs">
                    <input type="text" className="contact-input" value={name} id="name" name="name" placeholder="NAME" onChange={e => onChange(e)} required /> 
                    <input type="email" className="contact-input" value={email} id="email" name="email" placeholder="EMAIL" onChange={e => onChange(e)} required /> 
                    <input type="text" className="contact-input" value={subject} id="subject" name="subject" placeholder="SUBJECT" onChange={e => onChange(e)} required />
                    <textarea rows="3" className="contact-input" value={message} id="message" name="message" placeholder="GO AHEAD! DONT BE SHY" onChange={e => onChange(e)} required/>
                </div>
                <input type="submit" value="Submit" id="contact-submit" />            
            </form>
        </div>
    );
}

export default connect(null, { submitContactForm })(Contact);
