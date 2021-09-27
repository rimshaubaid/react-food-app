import { SET_CURRENT_USER ,CLEAR_STATE, GET_ERRORS } from '../actions/types';
import isEmpty from './is_empty';

const initialState = {
    isAuthenticated : false,
    user : {},
    error : null
};
 
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  
    switch (action.type) {

      case CLEAR_STATE:
        return {
          ...state,
          user: null,
          errors:null,
          loading: false,
        };
      case SET_CURRENT_USER: 
        return {
           ...state,
           isAuthenticated: !isEmpty(action.payload),
           user: action.payload,
           error : null,
           loading: false,
      };
      case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        user :null,
        isAuthenticated :false,
        loading: false,
      };

      default:
        return state;
    }
};