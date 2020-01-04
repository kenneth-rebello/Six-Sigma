import { ADD_FILE } from "../redux/types";

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
        default: 
            return state;
    }
}

export default fileReducer;