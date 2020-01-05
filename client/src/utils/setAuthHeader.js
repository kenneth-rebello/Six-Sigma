import axios from 'axios';

const setAuthHeader = token => {
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    }else{
        axios.defaults.headers.common['x-auth-token'] = undefined;
    }
}

export default setAuthHeader;