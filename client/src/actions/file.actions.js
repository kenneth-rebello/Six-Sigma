import axios from 'axios';
import { ADD_FILE } from '../redux/types';

export const addFile = fileNo => async dispatch => {

    dispatch({
        type: ADD_FILE,
        payload: fileNo
    })

}

export const addFileToDB = fileData => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await axios.post('api/file/new_file', fileData, config)

}
