import { SET_FORMDATA } from '../redux/types';

const initialState = {
    file: {},
    user: {},
    formData: {},
    other: {}
}

const utilReducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch(type){
        case SET_FORMDATA:
            return {
                ...state,
                formData: {
                    data: payload
                }
            }
        default: 
            return state;
    }
}

export default utilReducer;