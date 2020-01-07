import { SET_ALERT, REMOVE_ALERT } from '../redux/types';
import uuid from 'uuid';

export const setAlert = (msg, timeout = 3000) => dispatch => {
    
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: {
            id,
            msg
        }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id}), timeout);

}