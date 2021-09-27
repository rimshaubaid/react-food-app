import axios from "axios";
import { GET_LOCALIZED_MESSAGES } from "./types";
import { getError } from './errorActions';

export const getLocalizedMessages = messageKeys => dispatch => {
    axios
        .post('/retrieveLocalizedMessages', messageKeys)
        .then(res => 
            dispatch({
                type: GET_LOCALIZED_MESSAGES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(getError(err))
        );
};