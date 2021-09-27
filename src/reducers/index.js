import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

import imageReducer from './imageReducer';


import localizedMessageReducer from './localizedMessageReducer';
import productReducer from './productReducer';


export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    image: imageReducer,
    message: localizedMessageReducer,
    products : productReducer,

});