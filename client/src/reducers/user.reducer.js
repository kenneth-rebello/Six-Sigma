import {SET_CURRENT_USER, UNSET_CURRENT_USER} from '../redux/types';

const initialState = {
    currentUser:null
}

const userReducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch(type){
        case SET_CURRENT_USER:
            return{
                ...state,
                currentUser: payload
            }
        case UNSET_CURRENT_USER:
            return{
                ...state,
                currentUser: null
            }
        default: 
            return state;
    }
}

export default userReducer;