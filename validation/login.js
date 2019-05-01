const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = data => {
    let errors = {};

    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;


    if (!Validator.isEmail(data.email)) {
        errors.email = 'Incorrect email format';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}