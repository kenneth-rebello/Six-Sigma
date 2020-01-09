import { FETCH_DEPTS } from "../redux/types";

const initialState = {
    depts: []
}

const deptReducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch(type){
        case FETCH_DEPTS:
            return{
                ...state,
                depts: payload
            }
        default: 
            return state;
    }
}

export default deptReducer;