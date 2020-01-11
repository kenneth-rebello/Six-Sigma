import { ADD_FILE, LOAD_FILE, FETCH_FILES, FETCH_OWN_FILES, FETCH_ASS_FILES } from "../redux/types";

const initialState = {
    file: null,
    files: [],
    owned: [],
    assigned: [],
    newFile: "",
    loading: true
}

const fileReducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch(type){
        case ADD_FILE:
            return{
                ...state,
                newFile: payload,
                loading: false
            }
        case LOAD_FILE:
            return{
                ...state,
                file: payload,
                loading: false
            }
        case FETCH_FILES:
            return{
                ...state,
                files: payload,
                loading: false
            }
        case FETCH_OWN_FILES:
            return{
                ...state,
                owned: payload
            }
        case FETCH_ASS_FILES:
            return{
                ...state,
                assigned: payload
            }
        default: 
            return state;
    }
}

export default fileReducer;