import { SET_FORMDATA, FETCH_REQUESTS, SET_RECORDS, FETCH_TASKS, FETCH_TASK, SET_USER_LIST, CLEAR_USER_LIST, SET_TAT, SET_MULTI_RECORDS } from '../redux/types';

const initialState = {
    formData: {},
    requests:[],
    records: [],
    time:[],
    tasks: [],
    task: [],
    list:[],
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
        case SET_MULTI_RECORDS:
            return {
                ...state,   
                records: [...state.records, ...payload],
                loading: false
            }
        case FETCH_TASKS:
            return{
                ...state,
                tasks: payload,
                loading: false
            }
        case FETCH_TASK:{
            return {
                ...state,
                task: payload,
                loading: false
            }
        }
        case SET_USER_LIST:
            return {
                ...state,
                list: [...state.list, payload],
                loading: false
            }
        case CLEAR_USER_LIST:
            return {
                ...state,
                list: []
            }
        case SET_TAT:
            return{
                ...state,
                time: payload,
                loaidng: false
            }
        default: 
            return state;
    }
}

export default utilReducer;