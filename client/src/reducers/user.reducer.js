import {SET_CURRENT_USER, UNSET_CURRENT_USER, FETCH_USERS, CHECK_ONLINE} from '../redux/types';

const initialState = {
    currentUser:null,
    loggedIn:false,
    users:[],
    loading: true,
    online: false
}

const userReducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch(type){
        case SET_CURRENT_USER:    
            localStorage.setItem('token',payload._id);
            return{
                ...state,
                currentUser: payload,
                loggedIn: true,
                loading: false
            }
        case UNSET_CURRENT_USER:
            localStorage.removeItem('token');
            return{
                ...state,
                currentUser: null,
                loggedIn: false,
                loading: false
            }
        case FETCH_USERS:
            return{
                ...state,
                users: payload,
                loading: false
            }
        case CHECK_ONLINE:
            return{
                ...state,
                online: payload
            }
        default: 
            return state;
    }
}

export default userReducer;