import { GET_RECIPE_SUGGESTIONS } from '../actions/types';
const initialState = {
    loaded: false
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type){
        case GET_RECIPE_SUGGESTIONS:
            return {
                recipes: payload,
                loaded: true
            };
        default:
            return state;
    }
};