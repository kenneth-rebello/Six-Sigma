import { SET_FORMDATA, FETCH_REQUESTS, SET_RECORDS } from '../redux/types';

const initialState = {
    file: {},
    user: {},
    formData: {},
    other: {},
    requests:[],
    records: [],
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
        case SET_RECORDS:
            return {
                ...state,
                records: payload,
                loading: false
            }
        default: 
            return state;
    }
}

export default utilReducer;