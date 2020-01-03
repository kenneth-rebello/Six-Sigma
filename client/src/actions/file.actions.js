import axios from 'axios';
import { ADD_FILE } from '../redux/types';

export const addFileToDB = fileNo =>async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({fileNo});

    await axios.post('api/file/new_file', body, config)

    dispatch({
        action: ADD_FILE
    })
}