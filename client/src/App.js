import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
      <div id="header">
        <h1 id="logo">feedMe <i class="fas fa-pizza-slice"></i></h1>
        <a href="#" id="register">Register</a>
      </div>
      <Login />
      <div id="footer">&copy; Copyright 2019 feedMe</div>
    </div>
  );
}

export default App;
