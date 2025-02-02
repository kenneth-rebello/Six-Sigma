import { ADD_FILE, LOAD_FILE, FETCH_FILES, FETCH_REPORTS,
    FETCH_OWN_FILES, FETCH_ASS_FILES, FETCH_UPC_FILES, FETCH_CMP_FILES, FETCH_OVER_FILES } from "../redux/types";

const initialState = {
    file: null,
    files: [],
    owned: [],
    upcoming: [],
    assigned: [],
    completed: [],
    overdue: [],
    reports: [],
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
        case FETCH_UPC_FILES:
            return{
                ...state,
                upcoming: payload
            }
        case FETCH_CMP_FILES:
            return{
                ...state,
                completed: payload
            }
        case FETCH_REPORTS:
            return{
                ...state,
                reports: payload,
                loading: false
            }
        case FETCH_OVER_FILES:
            return{
                ...state,
                overdue: payload,
                loading: false
            }
        default: 
            return state;
    }
}

export default fileReducer;