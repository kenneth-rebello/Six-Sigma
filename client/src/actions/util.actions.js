import axios from 'axios';
import { SET_FORMDATA, FETCH_REPORTS } from "../redux/types";

export const setFormDataAction = data => dispatch =>{
    dispatch({
        type: SET_FORMDATA,
        payload: data
    })
}

export const fetchReports = () => async dispatch => {
    try {
        
        const res = await axios.get('/api/report');

        dispatch({
            type: FETCH_REPORTS,
            payload: res.data
        })

    } catch (err) {
        
    }
}