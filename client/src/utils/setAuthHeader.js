import axios from 'axios';

const setAuthHeader = currentUser => {
    if(currentUser._id) {
        axios.defaults.headers.common['x-auth-token'] = currentUser._id;
    }else{
        delete axios.defaults.headers.common('x-auth-token');
    }
}

export default setAuthHeader;