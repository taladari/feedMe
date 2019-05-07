import { CONTACT_FORM_SUBMIT } from '../actions/types';
const initialState = [];

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type){
        case CONTACT_FORM_SUBMIT:
        default:
            return state;
    }
};