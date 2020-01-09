import { SET_CURRENT_USER, UNSET_CURRENT_USER, FETCH_USERS, CHECK_ONLINE } from "../redux/types";
import { auth } from '../firebase/firebase.utils';
import axios from 'axios';
import { setAlert } from './alert.action';

export const checkIfOnline = result => dispatch => {
    dispatch({
        type: CHECK_ONLINE,
        payload: result
    })
}

export const setCurrentUser = user => async dispatch => {

    try {

        const { email, displayName, photoURL } = user;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({email, displayName, photoURL});
    
        const res = await axios.post('/api/user', body, config);
    
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

export const unsetCurrentUser = () => dispatch => {

    try {
    
        auth.signOut();
        dispatch({
            type: UNSET_CURRENT_USER
        })
        
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)));
        }
    }

}

export const fetchAllUsers = () =>async dispatch => {

    try {
     
        const res = await axios.get('/api/user/all');

        dispatch({
            type: FETCH_USERS,
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

export const fetchSupervisors = () =>async dispatch => {

    try {
     
        const res = await axios.get('/api/user/supervisors');

        dispatch({
            type: FETCH_USERS,
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

export const registerUser = (formData) => async dispatch => {

    try {
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/user/register', formData, config);

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