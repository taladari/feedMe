import axios from 'axios';
import { GET_RECIPE_SUGGESTIONS } from './types';

export const getRecipeSuggestions = () => async dispatch => {
    try {
        const recipes = await axios.get('/api/profiles/suggestions');
        dispatch({
            type: GET_RECIPE_SUGGESTIONS,
            payload: recipes.data
        });

    } catch (err) {
        
    }
};