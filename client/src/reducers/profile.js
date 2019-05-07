import {
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    SET_PROFILE_SUCCESS,
    SET_PROFILE_FAIL } from '../actions/types';

const initialState = {
    loaded: false
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type){
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload,
                loaded: true,
                result: true
            };
        case SET_PROFILE_SUCCESS:
            return state;
        case GET_PROFILE_FAIL:
            return {
                ...state,
                loaded: true,
                result: false
            };
        case SET_PROFILE_FAIL:
        default:
            return state;
    }
};