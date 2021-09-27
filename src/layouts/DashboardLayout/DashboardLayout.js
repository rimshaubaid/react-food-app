import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightSidebar from "../../components/Sidebar/Right-sidebar";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
const DashboardLayout = (props) => {
 // console.log(props);
  
  const [showRight, setShowRight] = useState(false);
  const [showMobileHeader, setShowMobileHeader] = useState(false);
  const [cartData, setCartData] = useState(null);
  const showMobile = (value) => {
    setShowMobileHeader(value);
  };

 
  return (
    <>
      <div className="main-body">
        <Sidebar path={props.path} showMobile={() => showMobile(true)} />

        <Col className="right-body">
          <Header
            name={props.name}
            showRightBar={() => setShowRight(true)}
            showMobileHeader={showMobileHeader}
            showMobile={() => showMobile(false)}
            updateCart={props.updateCart}
            loginRef={props.loginRef}
            regRef={props.regRef}
            cartData={props.cartData}
          />
         {props.children}
        </Col>
      </div>
      <RightSidebar
        show={showRight}
        cartData={props.cartData}
        updateCart={props.updateCart}
        loginRef={props.loginRef}
        regRef={props.regRef}
        closeRightbar={() => setShowRight(false)}
      />
    </>
  );
};

export default DashboardLayout;
