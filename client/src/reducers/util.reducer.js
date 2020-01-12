import { SET_FORMDATA, FETCH_REQUESTS } from '../redux/types';

const initialState = {
    file: {},
    user: {},
    formData: {},
    other: {},
    requests:[],
    loading: true
}

const utilReducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch(type){
        case SET_FORMDATA:
            return {
                ...state,
                formData: {
                    data: payload
                },
                loading: false
            }
        case FETCH_REQUESTS:
            return {
                ...state,
                requests: payload,
                loading: false
            }
        default: 
            return state;
    }
}

export default utilReducer;