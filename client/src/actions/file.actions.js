import axios from 'axios';
import { ADD_FILE, LOAD_FILE, FETCH_FILES, FETCH_OWN_FILES } from '../redux/types';
import { setAlert } from './alert.action';

export const addFile = fileNo => dispatch => {

    dispatch({
        type: ADD_FILE,
        payload: fileNo
    })

}

export const addFileToDB = fileData => async dispatch => {
    
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('api/file/new_file', fileData, config);
    
        dispatch({
            type: LOAD_FILE,
            payload: res.data
        })

        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)));
        }
    }

}

export const getAllFiles = () => async dispatch => {

    try {

        const res = await axios.get('/api/file');

        dispatch({
            type: FETCH_FILES,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)));
        }
    }

}

export const getFileById = id => async dispatch => {

    try {

        const res = await axios.get(`/api/file/one/${id}`);

        dispatch({
            type: LOAD_FILE,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)));
        }
    }

}

export const getOwnerFiles = () => async dispatch => {

    try {
        
        const res = await axios.get('/api/file/own');

        dispatch({
            type: FETCH_OWN_FILES,
            payload: res.data
        })

    } catch (err) {
        console.log(err)
        // const errors = err.response.data.errors;
        // if(errors){
        //     errors.forEach(error => dispatch(setAlert(error.msg)));
        // }
    }

}

export const fileQRScanned = name => async dispatch => {
    try {
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({name})

        console.log(body)

        const res = await axios.post('api/file/scan', body, config);

        dispatch({
            type: LOAD_FILE,
            payload: res.data
        })

        return res.data._id;

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)));
        }
        return err.response.data.id
    }
}