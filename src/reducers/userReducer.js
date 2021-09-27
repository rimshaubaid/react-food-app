import {REGISTER,LOADING} from '../actions/types';

const initialState = {
    register : null,
    loading: false
};
 
export default (state = initialState, action) => {
    switch (action.type) {
      case LOADING:
        return {
          ...state,
          loading: true
        };
      case REGISTER: 
        return {
           ...state,
           register : action.payload,
           loading: false
      };
      
      
      default:
        return state;
    }
};