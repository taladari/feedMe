import axios from 'axios';
import { 
    GET_RECIPES_SUCCESS, 
    GET_RECIPES_FAIL,
    GET_RECIPE_SUGGESTIONS } from './types';
import { ALL, VEGAN, GLUTEN_FREE } from '../utils/preferences';

export const getRecipes = (num, type) => async dispatch => {
    var recipes = {};
    try {
        switch (type) {
            case ALL:
                recipes = await axios.get(`/api/recipes/${num}`); 
                break;
            case VEGAN:
                recipes = await axios.get(`/api/recipes/vegan/${num}`); 
                break;
            case GLUTEN_FREE:
                recipes = await axios.get(`/api/recipes/gluten-free/${num}`);
                break;
        }
        console.log(recipes)
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