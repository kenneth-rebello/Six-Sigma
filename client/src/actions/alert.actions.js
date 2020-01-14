import { SET_ALERT, REMOVE_ALERT } from '../redux/types';
import uuid from 'uuid';
import { fetchRequests, fetchReports } from './util.actions';

export const setAlert = (msg, timeout = 5000) => dispatch => {
    
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

export const checkPending = () => dispatch => {
    try {
        
        const requests = fetchRequests();
        const reports = fetchReports();

        dispatch(setAlert(`You have ${requests.length} pending requests and ${reports.length} pending reports`))

    } catch (err) {
        
    }
}