import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import LocalizedMessage from "./LocalizedMessage";
import { withTranslation } from "react-i18next";
import { Row, Col, Button } from "react-bootstrap";

import { mycart } from "../../actions/productActions";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.mycart();
  }

  onLogout = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    // this.props.history.push('/');
  };
  state = {
    isOpen: false,
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <Col lg={12} className="topHeader pb-3">
        <Row>
          <Col className=" companyName pt-3">
            {this.state.isOpen && (
              <div>
                <div id="mySidenav" className="sidenav">
                  <Link to="#" className="closebtn" onClick={this.handleToggle}>
                    &times;
                  </Link>
                  <Link to="/" onClick={this.handleToggle}>
                    <LocalizedMessage messageKey="menu.home" />
                  </Link>
                  <Link to="/collection" onClick={this.handleToggle}>
                    <LocalizedMessage messageKey="menu.credit" />
                  </Link>
                  <Link to="/expense" onClick={this.handleToggle}>
                    <LocalizedMessage messageKey="menu.debit" />
                  </Link>
                  <Link to="/lezar" onClick={this.handleToggle}>
                    <LocalizedMessage messageKey="menu.lezar" />
                  </Link>
                  <Link to="/customer" onClick={this.handleToggle}>
                    <LocalizedMessage messageKey="menu.customer" />
                  </Link>
                </div>
                <div className="off-canvas" onClick={this.handleToggle}></div>
              </div>
            )}
            {localStorage.headers ? (
              <Link
                to="#"
                onClick={this.handleToggle}
                style={{ color: "#000" }}
              >
                <span className="MenuIcon ">
                  <img
                    src="/assets/img/menu_icon.png"
                    style={{ width: "50px" }}
                    alt="User Avatar"
                    className="img-fluid img-icon"
                  />
                </span>
              </Link>
            ) : (
              this.props.t("CCU")
            )}{" "}
          </Col>
          <Col className=" text-center  pt-3 ">
            <Link
              to="/dashboard"
              className="closebtn"
              onClick={this.handleToggle}
            >
              <img
                src="/assets/img/logo.png"
                alt="logo"
                style={{ width: "60px" }}
                className="img-fluid img-logo"
              />
            </Link>
          </Col>
          {localStorage.headers ? (
            <Col className=" text-right">
              <div className="userDetail pt-3">
                <Link to="/" onClick={this.onLogout}>
                  <img
                    src="/assets/img/logout.png"
                    alt="logo"
                    style={{ width: "45px" }}
                    className="img-fluid img-logo"
                  />
                </Link>
              </div>
            </Col>
          ) : (
            ""
          )}{" "}
        </Row>
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  add_to_cart: state.products.add_to_cart,
  loading: state.products.loading,
});
export default withTranslation()(
  connect(mapStateToProps, { mycart, logoutUser })(Header)
);
