import { GET_IMAGE_OBJECT } from '../actions/types';

const initialState = {
    imageObject : '',
    imageID : ''
};
 
export default (state = initialState, action) => {
    switch (action.type) {
      case GET_IMAGE_OBJECT: 
        return {
           ...state,
           imageObject : action.payload,
           imageID : action.image_id
      };
      default:
        return state;
    }
};