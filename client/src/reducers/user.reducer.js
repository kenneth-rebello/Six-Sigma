import {SET_CURRENT_USER, UNSET_CURRENT_USER, FETCH_USERS} from '../redux/types';

const initialState = {
    currentUser:null,
    loggedIn:false,
    users:[],
    loading: true
}

const userReducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch(type){
        case SET_CURRENT_USER:
            return{
                ...state,
                currentUser: payload,
                loggedIn: true
            }
        case UNSET_CURRENT_USER:
            return{
                ...state,
                currentUser: null,
                loggedIn: false
            }
        case FETCH_USERS:
            return{
                ...state,
                users: payload,
                loading: false
            }
        default: 
            return state;
    }
}

export default userReducer;