import { GET_ERRORS, LOADING } from "../actions/types";

const initialState = {
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
