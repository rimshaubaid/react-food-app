import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightSidebar from "../../components/Sidebar/Right-sidebar";
import { useState } from "react";

const DashboardLayout = (props) => {
  const [showRight, setShowRight] = useState(false);
  const [showMobileHeader, setShowMobileHeader] = useState(false);

  const showMobile = (value) => {
    setShowMobileHeader(value);
  };

  return (
    <div>
      <div className="main-body">
        <Sidebar path={props.path} showMobile={() => showMobile(true)} />
        <div className="right-body">
          <Header
            name={props.name}
            showRightBar={() => setShowRight(true)}
            showMobileHeader={showMobileHeader}
            showMobile={() => showMobile(false)}
          />
          <div>{props.children}</div>
        </div>
      </div>
      <RightSidebar
        show={showRight}
        closeRightbar={() => setShowRight(false)}
      />
    </div>
  );
};

export default DashboardLayout;
