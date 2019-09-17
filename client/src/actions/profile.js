import axios from 'axios';
import { 
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    SET_PROFILE_SUCCESS,
    SET_PROFILE_FAIL,
    RATE_RECIPE,
    RATING_FAILED
    } from './types';

export const loadProfile = (id) => async dispatch => {
    try {
        const profile = await axios.get(`/api/profiles/${id}`); 
        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: profile.data
        });
    
    } catch (err) {
        dispatch({
            type: GET_PROFILE_FAIL
        });
    }
};


export const saveProfile = (id, ratedRecipes) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ id, ratedRecipes });

    try {
        const res = await axios.post(`/api/profiles`, body, config); 
        dispatch({
            type: SET_PROFILE_SUCCESS,
            payload: res
        });
        dispatch(loadProfile(id));  
    } catch (err) {
        console.log(err.message);
        dispatch({
            type: SET_PROFILE_FAIL
        });
    }
};

export const rateRecipe = (recipeId, score) => async dispatch =>{

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ recipeId, score });
    try {
        const res = await axios.post('api/profiles/rate', body, config);
        dispatch({
            type: RATE_RECIPE
        });
    }
    catch(err) {
        dispatch({
            type: RATING_FAILED
        })
    }
}