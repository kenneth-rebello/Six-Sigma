import axios from 'axios';
import { ADD_FILE, LOAD_FILE, FETCH_FILES, FETCH_OWN_FILES, FETCH_ASS_FILES, FETCH_UPC_FILES, FETCH_CMP_FILES, FETCH_REPORTS, FETCH_OVER_FILES } from '../redux/types';
import { setAlert } from './alert.actions';

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
        console.log(err)
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
        console.log(err)
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
        console.log(err)
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)));
        }
    }

}

export const getOwnedFiles = () => async dispatch => {

    try {
        
        const res = await axios.get('/api/file/own');

        dispatch({
            type: FETCH_OWN_FILES,
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


export const getAssignedFiles = () => async dispatch => {

    try {
        const res = await axios.get('/api/file/assigned');

        dispatch({
            type: FETCH_ASS_FILES,
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


export const getUpcomingFiles = () => async dispatch => {

    try {
        const res = await axios.get('/api/file/upcoming')

        dispatch({
            type: FETCH_UPC_FILES,
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


export const getCompletedFiles = () => async dispatch => {

    try {
        const res = await axios.get('/api/file/completed')

        dispatch({
            type: FETCH_CMP_FILES,
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

export const getOverdueFiles = () => async dispatch => {
    try {
        
        const res = await axios.get('/api/file/overdue');

        dispatch({
            type: FETCH_OVER_FILES,
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

export const getLateFiles = () => async dispatch => {
    try {
        
        const res = await axios.get('/api/file/late');

        dispatch({
            type: FETCH_OVER_FILES,
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
        console.log(err)
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)));
        }
        return err.response.data.id
    }
}

export const markFileDone = (id, history) => async dispatch =>{
    try {
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({id})

        const res = await axios.post('/api/file/done', body, config);

        history.push('/');
        history.push(`/file/${res.data._id}`);

    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)));
        }
        return err.response.data.id
    }
}

export const editFilePath = (lineage, id) => async dispatch => {
    try {
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({id, lineage})

        const res = await axios.post('/api/file/edit', body, config);

        dispatch({
            type: LOAD_FILE,
            payload: res.data
        })

        return res.data._id;

    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)));
        }
        return err.response.data.id
    }
}

export const reportUser = formData => async dispatch => {
    try {
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/report', formData, config);

    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)));
        }
    }
}

export const deleteReport = id => async dispatch => {
    try {
        
        const res = await axios.get(`/api/report/delete/${id}`);

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

export const recordReport = (data) => async dispatch => {
    try {
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/report/record', data, config);

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