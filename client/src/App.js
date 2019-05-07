import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import CreateProfile from './components/CreateProfile/CreateProfile';
import Alert from './components/Alert/Alert';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';


//Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.getItem('token')){
  setAuthToken(localStorage.getItem('token'));
}


const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return <Provider store={store}>
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path='/' component={Login} />
        <Alert />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/about' component={About} />
          <PrivateRoute exact path='/create-profile' component={CreateProfile} />
          <PrivateRoute exact path='/home' component={Home} />
        </Switch>
        <Footer />
      </div>
    </Router>
  </Provider>
};

export default App;
