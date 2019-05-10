import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import CreateProfile from './components/CreateProfile/CreateProfile';
import Alert from './components/Alert/Alert';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import RecipeSuggestions from './components/RecipeSuggestions/RecipeSuggestions';
import CookingLoading from './components/CookingLoading/CookingLoading';


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
          <Route exact path='/contact' component={Contact} />
          <PrivateRoute exact path='/create-profile' component={CreateProfile} />
          <PrivateRoute exact path='/logout' component={Logout} />
          <PrivateRoute exact path='/home' component={Home} />
          <PrivateRoute exact path='/suggestions' component={RecipeSuggestions} />
        </Switch>
        <Footer />
      </div>
    </Router>
  </Provider>
};

export default App;
