import axios from "axios";
import { FETCH_DEPTS } from "../redux/types";
import { setAlert } from "./alert.actions";

export const fetchDepts = () => async dispatch => {
    try {
        
        const res = await axios.get('/api/dept');

        dispatch({
            type: FETCH_DEPTS,
            payload: res.data
        })

    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)));
        }
    }
}