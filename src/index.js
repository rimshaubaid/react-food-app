import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import * as serviceWorker from "./serviceWorker";
import setAuthToken from "./utils/setAuthToken";
import axios from "axios";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

if (localStorage.headers) {
  const accessToken = `Bearer ${
    JSON.parse(localStorage.getItem("headers")) &&
    JSON.parse(localStorage.getItem("headers")).data.token
  }`;
  setAuthToken(accessToken);
}

function noop() {}

if (process.env.NODE_ENV !== "development") {
  console.log = noop;
  console.warn = noop;
  console.error = noop;
}

noop();

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.unregister();
