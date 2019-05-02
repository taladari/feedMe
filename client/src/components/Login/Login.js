import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <form id="login-form">
                <div id="form-inputs">
                    <input type="email" className="login-input" id="email" name="email" placeholder="EMAIL" required /> 
                    <input type="password" className="login-input" id="password" name="password" placeholder="PASSWORD" required />
                </div>
                <input type="submit" value="Login" id="login-submit" />            
            </form>
        );
    }
}

export default Login;