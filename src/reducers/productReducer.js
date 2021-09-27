import {
  LOADING,
  GET_MENUS,
  OUTLATES,
  GET_MENUS_BY_ID,
  ADD_TO_CART,
  ORDER,
  DELETE_CART,
  ORDERS,
  RE_ORDERS,
  REGISTER,
  GET_ERRORS,
  CLEAR_STATE,
  SET_CURRENT_USER,
  PAYMENT,
  CATEGORY,
} from "../actions/types";
const initialState = {
  get_menus: null,
  child_products: null,
  product_hierarchy: null,
  product: null,
  product_id: null,
  loading: false,
  outlates: null,
  add_to_cart: null,
  get_menus_by_id: null,
  order: null,
  orders: null,
  reorders: null,
  signup: null,
  errors: null,
  payment: null,
  category: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case CATEGORY:
      return {
        ...state,
        category: action.payload,
        errors: null,
        loading: false,
      };

    case PAYMENT:
      return {
        ...state,
        payment: action.payload,
        errors: null,
        loading: false,
      };

    case CLEAR_STATE:
      return {
        ...state,
        signup: null,
        errors: null,
        loading: false,
      };

    case GET_MENUS:
      return {
        ...state,
        get_menus: action.payload,
        loading: false,
      };

    case GET_MENUS_BY_ID:
      return {
        ...state,
        get_menus_by_id: action.payload,
        loading: false,
      };

    case ADD_TO_CART:
      return {
        ...state,
        add_to_cart: action.payload,
        loading: false,
      };

    case DELETE_CART:
      return {
        ...state,
        delete_cart: action.payload,
        loading: false,
      };

    case OUTLATES:
      return {
        ...state,
        outlates: action.payload,
        loading: false,
      };

    case ORDER:
      return {
        ...state,
        order: action.payload,
        loading: false,
      };

    case ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };

    case RE_ORDERS:
      return {
        ...state,
        reorders: action.payload,
        loading: false,
      };

    case REGISTER:
      return {
        ...state,
        signup: action.payload,
        loading: false,
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
