import { GET_ERRORS } from './types';

import { logoutUser } from '../actions/authActions';
//get errors
export const getError = error => dispatch => {
   

        if (error.response) {
            if (error.response.status === 401 && error.response.data && error.response.data.error === 'invalid_token') {
                dispatch(logoutUser());
            } else if (error.response.status !== 200) {
                dispatch({
                    type: GET_ERRORS,
                    payload: error.response.data,
                    loading: false
                });
            }
        }
    };