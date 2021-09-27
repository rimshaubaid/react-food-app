import axios from "axios";
import { REGISTER } from "./types";
import { getError } from './errorActions';
import { setLoading } from "./commonActions";


export const signup = data => dispatch => {
    dispatch(setLoading());
    axios
        .post('/register', data)
        .then(res => 
            dispatch({
                type: REGISTER,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(getError(err))
        );
};
