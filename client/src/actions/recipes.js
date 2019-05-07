import axios from 'axios';
import { GET_RECIPES_SUCCESS, GET_RECIPES_FAIL } from './types';

export const getRecipes = (num) => async dispatch => {
    try {
        const recipes = await axios.get(`api/recipes/${num}`); 
        dispatch({
            type: GET_RECIPES_SUCCESS,
            payload: recipes.data
        });
    
    } catch (err) {
        dispatch({
            type: GET_RECIPES_FAIL
        });
    }
};