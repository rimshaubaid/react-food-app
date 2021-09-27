import axios from 'axios';

const setAuthToken = headersData => {
    if (headersData) {
        axios.defaults.headers.common['Authorization'] = headersData;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }

  


};

export default setAuthToken;