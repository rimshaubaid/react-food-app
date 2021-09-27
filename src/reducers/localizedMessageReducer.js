import { GET_LOCALIZED_MESSAGES } from '../actions/types';

const initialState = {
    key : null   
};
 
export default (state = initialState, action) => {
    switch (action.type) {
      case GET_LOCALIZED_MESSAGES: 
        return {
           ...state,
           key : action.payload
      }
      default:
        return state;
    }
};