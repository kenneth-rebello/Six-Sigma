import axios from 'axios';
import { SET_LANG, SET_FORMDATA, FETCH_REPORTS, FETCH_REQUESTS, SET_CURRENT_USER, SET_RECORDS, SET_MULTI_RECORDS, CLEAR_MULTI_RECORDS } from "../redux/types";
import { setAlert } from './alert.actions';

export const setLanguage = lang => async dispatch => {
    try {
        
        const res = await axios.get(`/api/user/language/${lang}`);

        dispatch({
            type: SET_CURRENT_USER,
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

export const setFormDataAction = data => dispatch =>{
    dispatch({
        type: SET_FORMDATA,
        payload: data
    })
}

export const fetchRecordsById = id =>async dispatch => {
    const res = await axios.get(`/api/user/stats/${id}`);

    dispatch({
        type: SET_RECORDS,
        payload: res.data
    })
}

export const fetchMultiRecords = id => async dispatch => {
    const res = await axios.get(`/api/user/stats/${id}`);

    dispatch({
        type: SET_MULTI_RECORDS,
        payload: res.data
    })
}

export const clearMultiRecords = () => dispatch => {
    dispatch({
        type: CLEAR_MULTI_RECORDS
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
        console.log(err)
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)));
        }
    }
}

export const submitRequest = formData => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const res = await axios.post('/api/request', formData, config);

    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)));
        }
    }
}

export const fetchRequests = () => async dispatch => {
    try {
        
        const res = await axios.get('/api/request');

        dispatch({
            type: FETCH_REQUESTS,
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


export const fetchRequestsForUser = () => async dispatch => {
    try {
        
        const res = await axios.get('/api/request/user');

        dispatch({
            type: FETCH_REQUESTS,
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

export const grantRequest = id => async dispatch => {
    try {
        
        const res = await axios.get(`/api/request/grant/${id}`);

        dispatch(setAlert('Request has been granted, make sure you have updated the file path'));

        dispatch({
            type: FETCH_REQUESTS,
            payload: res.data
        })

    } catch (err) {
        
    }
}

export const deleteRequest = id => async dispatch => {
    try {
        
        const res = await axios.get(`/api/request/delete/${id}`);

        dispatch({
            type: FETCH_REQUESTS,
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