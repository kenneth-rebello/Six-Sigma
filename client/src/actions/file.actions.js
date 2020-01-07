import axios from 'axios';
import { ADD_FILE, LOAD_FILE, FETCH_FILES } from '../redux/types';

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
        console.log(err.response)
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

        const res = await axios.post('api/file/scan', body, config);

        dispatch({
            type: LOAD_FILE,
            payload: res.data
        })

        return res.data._id;

    } catch (err) {
        
    }
}