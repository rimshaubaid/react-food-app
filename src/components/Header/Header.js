import React, { useState, useEffect} from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import "./Header.css";
import "../../assets/css/component.css";
import { ButtonGroup, Dropdown} from "react-bootstrap";

import cartImg from "../../assets/svgs/m-cart.svg";
import cartImg1 from "../../assets/svgs/my-cart.svg";
import logout from "../../assets/svgs/log-out.svg";
import user from "../../assets/svgs/user.svg";
import logo from "../../assets/svgs/logo.svg";
import "../../assets/css/modal.css";
import Step1 from "../Modals/Step1";
import PopUp from "../Modals/Popup";
import Step2 from "../Modals/Step2";
import Step3 from "../Modals/Step3";
import Signup from "../Signup/Signup";
import Signup2 from "../Signup/Signup2";

import { loginUser, logoutUser, ClearState } from "../../actions/authActions";

import { mycart, cartLocal } from "../../actions/productActions";
import Spinner from "../../common/Spinner";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import TrackOrder from "../TrackOrder/TrackOrder";
import TrackOrderNow from "../TrackOrderNow/TrackOrderNow";
import MenuModal from "../Menu/MenuModal";
const Header = (props) => {
  const history = useHistory();

  const [show, setShow] = useState(null);
  const [isLoggedIn, setLogin] = useState(false);

  const [signup, setSignup] = useState(null);
  const [signInVal, setSignInVal] = useState(null);
  const [signupVal, setSignupVal] = useState(null);

  const [popupText, setPopupText] = useState("");
  const [lshow, setLshow] = useState(false);


  
  const [loaded, setLoading] = useState(false);

  const [clLogin, setClogin] = useState(false);


  const [load, setLoad] = useState(false);
  const [name, setUser] = useState(null);

  const [cartData, setCartData] = useState(null);

  const [showtrackOrder, setShowTrackOrder] = useState(false);
  const [showTrackNow, setShowTracknow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    //localStorage.login && setLogin(true);
    
    //localStorage.clear();
    setCartData(props.cartData);
   // console.log(props);
    //console.log("______Auth_____");
    // console.log(props.auth.isAuthenticated);
    // console.log(loaded);

    if (!props.loading && !props.auth.isAuthenticated && clLogin) {
      setClogin(false);
      setPopupText("Phone or Password wrong!");
      setLshow(true);
    } else if (clLogin && !props.loading && props.auth.isAuthenticated) {
      setLogin(true);
      setClogin(false);
      localStorage.setItem("login", true);
      setLshow(false);
      setShow(null);

      if (localStorage.cart) {
        var datas = JSON.parse(localStorage.getItem("cart"));
        setLoad(true);
        props.cartLocal(datas);
      } else {
        props.mycart();
      }
      setLoading(true);
    }
    /*if (localStorage.order_id && props.auth.isAuthenticated) {
      console.log("Show track order");
    }*/

    // if (props.auth.isAuthenticated && loaded) {
    //   // console.log("______login header_____");
    //   setLogin(true);
    //   localStorage.setItem("login", true);
    //   //props.mycart();
    //   // console.log("logged in");

    //   //var newname = name.data.user.fname + " " + name.data.user.lname;
    // } else if (clLogin && props.auth.user && props.auth.user.data) {
    //   setLogin(true);
    //   localStorage.setItem("login", true);
    //   var newname =
    //     props.auth.user.data.user.fname + " " + props.auth.user.data.user.lname;
    //   setUser(newname);
    //   setClogin(false);
    //   setShow(null);
    //   setLshow(true);

    //   history.push("/");
    // } else if (clLogin && props.auth.errors && !props.auth.errors.success) {
    //   setClogin(false);
    //   setLshow(true);
    //   setPopupText("Phone or Password worng!");
    //   setLshow(true);
    //   // setSignInVal(null);
    //   props.ClearState();
    // }

    if (!load) {
      //console.log("++++++ header +++++");
      if (localStorage.login) {
        setLogin(true);
    
        setLoad(true);
        if (localStorage.headers) {
          var name =
            localStorage.headers && JSON.parse(localStorage.getItem("headers"));
          var newname = name.data.user.fname + " " + name.data.user.lname;
          setUser(newname);
        }
        if (localStorage.cart) {
          var data = JSON.parse(localStorage.getItem("cart"));
          props.cartLocal(data);
        } else {
          props.mycart();
        }
      } else {
        if (localStorage.cart) {
          var datas = JSON.parse(localStorage.getItem("cart"));
          setLoad(true);
          props.cartLocal(datas);
        }
      }
      if (localStorage.popup && localStorage.login) {
        setShowMenu(true);
        localStorage.removeItem("popup");
      }
     
    }
    

    if (!props.loading && props.add_to_cart !== null && loaded) {
      console.log('set cart header');
      props.updateCart(props.add_to_cart.data);
      setCartData(props.add_to_cart.data);
      if (localStorage.cart && localStorage.login) {
        localStorage.removeItem("cart");
      }
      if (loaded) {
        console.log("reload");
        localStorage.setItem("popup", true);
        window.location.reload();
      }
    }
  }, [clLogin, history, load, loaded, props]);

  const showModal = (event, val) => {
    event && event.preventDefault();
    setShow(val);
  };

  const setLoginValue = (data) => {
    setSignInVal(data);
  };

  const loginClicked = (data) => {
    if (data.password && data.phone && !clLogin) {
      props.loginUser(data, true);
      setClogin(true);
     
    }
     
  };

  const CloseloggedIn = () => {
    setShow(null);

  };

  const logoutFunction = () => {
    setLogin(false);

    localStorage.removeItem("login");

    localStorage.removeItem("cart");
    localStorage.clear();
    props.logoutUser();
    props.ClearState();
    props.updateCart(null);
    window.location.reload();
  };

  const showSignup = (event, key) => {
    event.preventDefault();
    setSignup(key);
  };
  const setSignupValue = (data) => {
    setSignupVal(data);
  };

  const SignUPclose = () => {
    setSignup(null);

    /*if (localStorage.order_id) {
      setShowTrackOrder(true);
    }*/
    console.log("Sign up close");
  };
  const showTrackOrderNowFunction = () => {
    setShowTrackOrder(false);
    setShowTracknow(true);
  };
  const trackOrderPage = () => {
    setShowTracknow(true);
    if (localStorage.order_id) {
      var order_id = localStorage.order_id;
      localStorage.removeItem("order_id");
      setShowTracknow(false);
      history.push("/track-order/" + order_id);
    }
  };

  return (
    <>
   
      {props.loading && <Spinner />}
      <header className="page-header">
      <MenuModal show={showMenu} closeModal={() => setShowMenu(false)} />
        <PopUp
          text={popupText}
          show={lshow}
          closeModal={() => setLshow(false)}
        />
        <Step1
          show={show === 1 ? true : false}
          closeModal={() => setShow(null)}
          showNext={(event) => showModal(event, 2)}
        />
        <Step2
          show={show === 2 ? true : false}
          closeModal={() => setShow(null)}
          signInVal={signInVal}
          setLoginValue={setLoginValue}
          showNext={(event) => showModal(event, 3)}
        />
        <Step3
          signInVal={signInVal}
          loginClicked={loginClicked}
          setLoginValue={setLoginValue}
          show={show === 3 ? true : false}
          closeModal={CloseloggedIn}
        />

        <Signup
          show={signup === 1 ? true : false}
          closeModal={() => setSignup(null)}
          nextStep={() => setSignup(2)}
          setSignup={setSignupValue}
          signupVal={signupVal}
        />
        <Signup2
          show={signup === 2 ? true : false}
          closeModal={() => SignUPclose(null)}
          setSignup={setSignupValue}
          signupVal={signupVal}
        />
        <TrackOrder
          show={showtrackOrder}
          closeModal={() => setShowTrackOrder(false)}
          trackOrderNow={() => showTrackOrderNowFunction()}
        />

        <TrackOrderNow
          show={showTrackNow}
          closeModal={() => setShowTracknow(false)}
          trackOrder={() => trackOrderPage()}
        />

        <div className="is">
          <div className="page-logo">
            <figure>
              <a href="/">
                <img src={logo} alt="" />
              </a>
            </figure>
          </div>
          <div className="d-none d-md-block">
            <Link to={"/"}> Home </Link>
          </div>
          <div className="d-block d-sm-none">
            {/*<Button className="pull-right table-Button" variant="danger">
              Table no <span>18</span>
            </Button>*/}
          </div>
          <ul>
            <div className="d-none d-md-block">
              {isLoggedIn ? (
                <li>
                  <img src={user} className="ml-2" alt="" />
                  <Dropdown as={ButtonGroup} className="ml-2 logged-user">
                    <Dropdown.Toggle
                      id="dropdown-custom-1"
                      className="bg-transparent border-0"
                    >
                      {name && name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="main-menu">
                      <Dropdown.Item
                        onClick={() => history.push("/account")}
                        eventKey="1"
                        className="border-bottom"
                      >
                        Account
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="2"
                        className="border-bottom"
                        onClick={() => history.push("/track-order")}
                      >
                        Track Order
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="3"
                        className="border-bottom"
                        onClick={() => history.push("/order-history")}
                      >
                        Order History
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="4" onClick={logoutFunction}>
                        <Link to={"/"}>Sign out</Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              ) : (
                <li className="credential">
                  <div href={null} className="cursor">
                    <span
                      ref={props.loginRef}
                      onClick={(event) => showModal(event, 1)}
                    >
                      Log in
                    </span>
                    /
                    <span
                      ref={props.regRef}
                      onClick={(event) => showSignup(event, 1)}
                    >
                      {" "}
                      Sign up
                    </span>
                    <img src={logout} className="ml-2" alt="" />
                  </div>
                </li>
              )}
            </div>

            <li className="cart">
              {/* {props.cartData && props.cartData.count > 0 ? (
                <span className="cart-count-badge">
                  {props.cartData.count && props.cartData.count}
                </span>
              ) : null} */}

              <div className="d-none d-md-block">
                {cartData && cartData.count > 0 ? (
                  <span className="cart-count-badge">
                    {cartData.count && cartData.count}
                  </span>
                ) : null}
                <div
                  className="app-data btn btn-outline-ligh"
                  app-data="myCart"
                  onClick={props.showRightBar}
                >
                  <img src={cartImg1} alt="cart" className="cart-icon" />
                </div>
              </div>
            </li>
          </ul>
          <div className="d-block d-sm-none mycart-mb">
            {props.cartData && props.cartData.count > 0 ? (
              <div
                className="mycartbtn active"
                app-data="myCart"
                onClick={props.showRightBar}
              >
                <span>{props.cartData.count && props.cartData.count}</span>
                <img src={cartImg} alt="cart" className="cart-icon" />
              </div>
            ) : (
              <div
                className="mycartbtn "
                app-data="myCart"
                onClick={props.showRightBar}
              >
                <img src={cartImg} alt="cart" className="cart-icon" />
              </div>
            )}
          </div>
        </div>
        <div
          className={`menu-overlay ${props.showMobileHeader ? "open" : ""}`}
        ></div>
        <div className={`ins ${props.showMobileHeader ? "open" : ""}`}>
          <figure className="mb-4">
            <a href="/">
              {" "}
              <img src={logo} alt="logo" />{" "}
            </a>
          </figure>
          {isLoggedIn ? (
            <ul className="menu">
              <li>
                <a href="/" className="user">
                  <figure>
                    <img src="images/user-sm.svg" alt="" />
                  </figure>
                  <span> {name && name}</span>
                
                </a>
              </li>
              <li className="separator">
                <a href="/" onClick={logoutFunction}>
                  Sign Out
                </a>
              </li>

              <li>
                <a href="/track-order">Track Order</a>
              </li>
              <li>
                <a href="/order-history">Order History</a>
              </li>
            </ul>
          ) : (
            <ul className="menu">
              <li className="separator">
                <a href="/">
                  <span onClick={(event) => showModal(event, 1)}>Login</span>{" "}
                  &nbsp;/ &nbsp;
                  <span onClick={(event) => showSignup(event, 1)}>Sign up</span>
                </a>
              </li>
            </ul>
          )}
          <div className="bottom">
            <a href="/" className="language">
              <img src="images/globe.svg" alt="" /> English
            </a>
            <a href="/" className="close" onClick={props.showMobile}>
              <span aria-hidden="true">×</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

Header.propTypes = {
  showRightBar: PropTypes.func.isRequired,
  showMobile: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  add_to_cart: state.products.add_to_cart,
  loading: state.products.loading,
});
export default withTranslation()(
  connect(mapStateToProps, {
    ClearState,
    cartLocal,
    logoutUser,
    mycart,
    loginUser,
  })(Header)
);
