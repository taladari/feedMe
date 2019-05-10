import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import recipes from './recipes';
import profile from './profile';
import suggestions from './suggestions';
import { LOGOUT } from '../actions/types';

const appReducer = combineReducers({
    alert,
    auth,
    recipes,
    profile,
    suggestions
});


const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;