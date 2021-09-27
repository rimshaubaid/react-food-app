import React, { useState, useRef } from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import "../../assets/css/modal.css";

const PublicRoute = ({ component: Component, ...rest }) => {
  let [cartData, setCartData] = useState(null);
  let loginRef = useRef();
  let regRef = useRef();

  const updateCart = (value) => {
    setCartData(value);
  };

  return (
    <Route
      {...rest}
      render={() => {
        return (
          <DashboardLayout
            cartData={cartData}
            name={rest.name}
            path={rest.path}
            loginRef={loginRef}
            regRef={regRef}
            updateCart={updateCart}
          >
            <Component
              loginRef={loginRef}
              regRef={regRef}
              updateCart={updateCart}
            />
          </DashboardLayout>
        );
      }}
    />
  );
};

export default PublicRoute;
