import { ADD_FILE, LOAD_FILE, FETCH_FILES } from "../redux/types";

const initialState = {
    file: null,
    files: [],
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
        default: 
            return state;
    }
}

export default fileReducer;