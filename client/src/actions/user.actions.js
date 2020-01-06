import { SET_CURRENT_USER, UNSET_CURRENT_USER, FETCH_USERS } from "../redux/types";
import { auth } from '../firebase/firebase.utils';
import axios from 'axios';

export const setCurrentUser = user => async dispatch => {

    try {

        const { email, displayName, photoURL } = user;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({email, displayName, photoURL});
    
        const res = await axios.post('/api/user', body, config)
    
        dispatch({
            type: SET_CURRENT_USER,
            payload: res.data
        })
        
    } catch (err) {
        
    }

}

export const unsetCurrentUser = () => dispatch => {

    try {
    
        auth.signOut();
        dispatch({
            type: UNSET_CURRENT_USER
        })
        
    } catch (err) {
        
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
        
    }

} 