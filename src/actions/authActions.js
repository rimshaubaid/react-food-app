import axios from "axios";
import { SET_CURRENT_USER,CLEAR_STATE, GET_ERRORS } from "./types";
import setAuthToken from "../utils/setAuthToken";
import { setLoading } from "./commonActions";
const authURL = process.env.REACT_APP_API_AUTH_URL;
const client_id = process.env.REACT_APP_OAUTH_CLIENT_ID;
const secret = process.env.REACT_APP_OAUTH_SECRET_KEY;

const encoded = btoa(client_id + ":" + secret);

const refreshTokenData = {
  grant_type: "refresh_token",
  refresh_token:
    localStorage.headers &&
    JSON.parse(localStorage.getItem("headers")).success.token,
};
//Login User
export const loginUser = (userData, shouldRefresh) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post(
      authURL,
      userData === null && shouldRefresh ? refreshTokenData : userData,
      {
        headers: {
          Authorization: `Basic ${encoded}`,
        },
      }
    )
    .then((res) => {
      var data = res.data;
   

      var d = new Date();
      var n = d.getTime();
      data["created_at"] = n;
      localStorage.setItem("headers", JSON.stringify(data));
      setAuthToken(`Bearer ${data.data.token}`);
      dispatch(setCurrentUser(data));
    })
    .catch((err) => {
      let error;
      if (err.response && err.response.data) {
        error = err.response.data;
      } else {
        error = null;
      }
      dispatch(sendError(error));
    });

  if (userData === null && shouldRefresh) {
     window.location.reload();
     
  }
};

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
    loading: false
  };
};

//Log user out
export const logoutUser = () => (dispatch) => {
  // Set current user to {} which will set isAuthenticated to false
  localStorage.clear();
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const sendError = (error) => {
  return {
    type: GET_ERRORS,
    payload: error,
  };
};

export const ClearState = () => dispatch => {
  dispatch({
    type: CLEAR_STATE
})
};



