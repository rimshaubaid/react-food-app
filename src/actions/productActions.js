import axios from "axios";
import {
  GET_MENUS,
  GET_PRODUCTS_BY_MENU,
  GET_MENUS_BY_ID,
  ADD_TO_CART,
  OUTLATES,
  ORDER,
  RE_ORDERS,
  ORDERS,
  CATEGORY,
  REGISTER,
  CLEAR_STATE,
  PAYMENT
} from "./types";
import { setLoading } from "./commonActions";
import { getError } from "./errorActions";


export const getCategories = () => (dispatch) => { 
  dispatch(setLoading());
  axios
  .get("/category")
  .then((res) =>
    dispatch({
      type: CATEGORY,
      payload: res.data,
    })
  )
  .catch((err) => dispatch(getError(err)));
  
}

export const submitPayment = (data) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post("/payment", data)
    .then((res) =>
      dispatch({
        type: PAYMENT,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};

export const ClearState = () => (dispatch) => {
  dispatch({
    type: CLEAR_STATE,
  });
};

export const Signup = (data) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post("/register", data)
    .then((res) =>
      dispatch({
        type: REGISTER,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};

export const Reorder = (id) => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("/orders/reorder/" + id)
    .then((res) => {
      dispatch({
        type: RE_ORDERS,
        payload: res.data.data.original ? res.data.data.original : null,
      });
    })
    .catch((err) => dispatch(getError(err)));
};

export const MyOrders = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("/orders")
    .then((res) => {
      dispatch({
        type: ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(getError(err)));
};
export const SingleOrder = (id) => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("/orders/" + id)
    .then((res) => {
      dispatch({
        type: ORDER,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(getError(err)));
};

export const placeOrder = (data) => (dispatch) => {
  dispatch(setLoading());
  
  axios
    .post("/orders", data)
    .then((res) => {
      dispatch({
        type: ORDER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response.data)
    dispatch(getError(err))
  });

    
};

export const getOutlates = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("/outlets")
    .then((res) => {
      dispatch({
        type: OUTLATES,
        payload: res.data,
      });
      
    })
    .catch((err) => dispatch(getError(err)));
};

export const cartUpdate = (id, data) => (dispatch) => {
  dispatch(setLoading());

  axios
    .put("/cart/" + id, data)
    .then((res) => {
      dispatch({
        type: ADD_TO_CART,
        payload: res.data.data.original ? res.data.data.original : null,
      });
    })
    .catch((err) => dispatch(getError(err)));
};

export const mycart = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("/cart")
    .then((res) => {
      dispatch({
        type: ADD_TO_CART,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(getError(err)));
};

export const clearCart = () => (dispatch) => {
  dispatch(setLoading());

  axios
    .delete("/cart/clear")
    .then((res) => {
      dispatch({
        type: ADD_TO_CART,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(getError(err)));
};

export const clearCartSingle = (cartId) => (dispatch) => {
  dispatch(setLoading());

  axios
    .delete("/cart/" + cartId)
    .then((res) => {
      dispatch({
        type: ADD_TO_CART,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(getError(err)));
};
export const cartLocal = (data) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post("/cart", data)
    .then((res) => {
      dispatch({
        type: ADD_TO_CART,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(getError(err)));

}
export const addTocart = (data) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post("/cart", data)
    .then((res) => {
      dispatch({
        type: ADD_TO_CART,
        payload: res.data.data ? res.data.data : null,
      });
    })
    .catch((err) => dispatch(getError(err)));
};

export const getProductsByCategory = (categoryID) => (dispatch) => {
  dispatch(setLoading());
  axios
    .get(`/menus/${categoryID}`)
    .then((res) =>
      dispatch({
        type: GET_PRODUCTS_BY_MENU,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};
export const getMenubyId = (menuID) => (dispatch) => {
  dispatch(setLoading());
  axios
    .get(`/menus/${menuID}`)
    .then((res) =>
      dispatch({
        type: GET_MENUS_BY_ID,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(getError(err)));
};

export const getMenus = () => (dispatch) => {
  dispatch(setLoading());
  return axios
    .get(`/menus`)
    .then((res) => {
      dispatch({
        type: GET_MENUS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(getError(err)));
};
