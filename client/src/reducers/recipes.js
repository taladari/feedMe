import { 
    GET_RECIPES_SUCCESS, 
    GET_RECIPES_FAIL } from '../actions/types';
const initialState = [];

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type){
        case GET_RECIPES_SUCCESS:
            return payload;
        case GET_RECIPES_FAIL:
        default:
            return state;
    }
};