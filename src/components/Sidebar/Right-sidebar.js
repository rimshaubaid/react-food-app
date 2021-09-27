import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import Pickup from "../../components/Pickup/Pickup";
import PickupDate from "../../components/PickupDate/PickupDate";
import TrackOrder from "../../components/TrackOrder/TrackOrder";
import TrackOrderNow from "../../components/TrackOrderNow/TrackOrderNow";
import DeliveryModal from "../DeliveryModal/DeliveryModal";
import { useHistory } from "react-router-dom";
import cartImg1 from "../../assets/svgs/e_cart.svg";
import "./Rightbar.css";
import "../../assets/css/modal.css";
import arrowup from "../../assets/svgs/arrow-up.svg";
import axios from 'axios';
import {
  clearCart,
  clearCartSingle,
  placeOrder,
} from "../../actions/productActions";

import CartRender from "./CartRender";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import PopUp from "../Modals/Popup";

const RightSidebar = (props) => {
  const [showCartTotal, setShowCartTotal] = useState(false);
  const show = props.show;
  const [orderPlaced, setorderPlaced] = useState(false);
  const [method, setMethod] = useState(1);
  const [methodText, setMethodText] = useState("Choose");
  const [address, setAddress] = useState(null);


  const [showPickup, setShowPickup] = useState(false);
  const [showPickupDate, setShowPickupDate] = useState(false);
  const [showtrackOrder, setShowTrackOrder] = useState(false);
  const [showTrackNow, setShowTracknow] = useState(false);
  const [order, setOrder] = useState([]);
  const history = useHistory();
  const [showDelivery, setShowDelivery] = useState(false);
  const [lshow, setLshow] = useState(false);
  const [popupText, setPopupText] = useState("");
  const authURL = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
   
    if (
      props.loading === false &&
      props.add_to_cart &&
      props.add_to_cart.data &&
      Object.keys(props.add_to_cart.data).length === 0
    ) {
      props.updateCart(null);
    }
   
    if (
      props.loading === false &&
      !orderPlaced &&
      props.order &&
      props.order.success &&
      Object.keys(props.order.data).length > 0
    ) {
      setorderPlaced(true); 
      props.closeRightbar();
      //history.push("/payment/" + props.order.data.id);
      console.log("order placed!");
      console.log("method",method);
      axios.post(authURL + "orderPlace")
      .then(res => console.log('accept this order from dashboard' , res.data.data[0].orderRef))
      .catch(err => {
        let error;
        if(err.response && err.response.data){
          error=err.response.data;
        } else {
          error=null;
        }
        console.log(error);
      })
      
      history.push({
      pathname:('/payment'),
       state:props.add_to_cart 
    })
    }
    
  }, [method,authURL, history, orderPlaced, props]);

  const clearCart = () => {
    props.clearCart();

    //  localStorage.removeItem("order_type");
    localStorage.removeItem("cart_data");
    localStorage.removeItem("cart");
  };

  const cartId = () => {
    if (!props.cartData) {
      return false;
    }

    let cartString = "";
    let cdata = props.add_to_cart.data.cart;
    if (cdata && Object.keys(cdata).length > 0) {
      Object.keys(cdata).map((key, index) => {
        cartString += cdata[key].id + ",";
      });
      return cartString;
    } else {
      return false;
    }
  };

  const ProcessCheckOut = () => {
    let cart_id = cartId();
    
    if (!cart_id) {
      setPopupText("Your cart is empty!");
      setLshow(true);
      return;
    }
    
    if (!localStorage.login && localStorage.cart) {
      if (!localStorage.d_address && method === 1) {
        setPopupText("Select Address!");
        setLshow(true);
        return;
      }
      if (!localStorage.outlate && method === 2) {
        setPopupText("Select Outlet!");
        setLshow(true);
        return;
      }
      if (!localStorage.time && !localStorage.date) {
        setPopupText("Select time and date!");
        setLshow(true);
        return;
      }
      localStorage.setItem("order_type", method);
      localStorage.setItem("cart_data", JSON.stringify(props.cartData));
      props.closeRightbar();
      history.push({
      pathname:('/payment'),
       state:props.add_to_cart 
    })
    return;
    }
    console.log("Process");

    if (method === 1) {
      if (address) {
        
        let data = {
          d_address: JSON.stringify(address),
          cart_id: cartId(),
          order_type: 1,
          time: order.time && order.time,
          date: order.date && order.date,
        };
        
       
        props.placeOrder(data);
        console.log('data is posted in orders')
        setorderPlaced(false);
      } else {
        setPopupText("Select address and time!");
        setLshow(true);
      }
      console.log("delivery");
      
    } else if (order.out_name) {
      let data = {
        ...order,
        cart_id: cartId(),
      };
      console.log('data is posted in orders!');
      props.placeOrder(data);
      setorderPlaced(false);

      console.log("pickup");
    } else {
      setPopupText("Select Outlet and time!");
      setLshow(true);
    }
   
    console.log("ProcessCheckOut");
    
  };


  const changeMethod = (key) => {
    if (key === 1) {
      setMethodText("Delivery");
    } else {
      setMethodText("Pick Up");
    }
    setMethod(key);

    localStorage.setItem("order_type", key);
  };
  const showPickFunction = () => {
    // console.log("____Show pick up function_______");
    setShowPickup(true);
  };
  const pickupDateFunction = () => {
    setShowPickupDate(true);
   
    setShowPickup(false);
  };
  const showTrackOrderNowFunction = () => {
    setShowTrackOrder(false);
    setShowTracknow(true);
  };

  const trackOrderPage = () => {
    setShowTracknow(true);
    history.push("/track-order");
  };

  const trackOrderFunction = () => {
    //console.log("____Show trackOrderFunction_______");
    setShowPickupDate(false);
    setShowTrackOrder(true);
  };
  const showDelivary = () => {
   
    setShowDelivery(true);
  };

  // const PlaceOrders = () => {
  //   console.log("some data");
  //   console.log(order);

  //   setShowPickupDate(false);
  //   // let data = {
  //   //   ...order,
  //   //   cart_id: cartId(),
  //   // };

  //   // props.placeOrder(data);
  // };

  return (
    <div>
       <PopUp
          text={popupText}
          show={lshow}
          closeModal={() => setLshow(false)}
        />
      <DeliveryModal
        show={showDelivery}
        loginRef={props.loginRef}
        setAddress={setAddress}
        closeModal={() => setShowDelivery(false)}
        showPickupDate={() => pickupDateFunction()}
      />

      <Pickup
        setOrder={setOrder}
        order={order}
        show={showPickup}
        closeModal={() => setShowPickup(false)}
        showPickupDate={() => pickupDateFunction()}
      />

      <PickupDate
        setOrder={setOrder}
        order={order}
        show={showPickupDate}
        method={method}
        address={address}
        closeModal={() => setShowPickupDate(false)}
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

      <div className={`mycart-dropdown ${show ? "open" : ""}`} id="myCart">
        <div className="head">
          <Dropdown className="d-none d-sm-block" as={ButtonGroup}>
            <Dropdown.Toggle id="dropdown-item-button" className="btn dropdown-toggle border-0 " style={{backgroundColor:"red"}}>
              {methodText}
            </Dropdown.Toggle>
            <Dropdown.Menu  style={{paddingRight:'0',backgroundColor:"black"}}>
              <Dropdown.Item
                eventKey="1"
                onClick={() => changeMethod(1)}
                className="border-bottom" style={{backgroundColor:"black",color:"white"}}
              >
                Delivery
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={() => changeMethod(2)} style={{maxWidth:'2px',backgroundColor:"black",color:"white"}}>
                Pick Up
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <h2>Your cart</h2>
          <div className="action">
            <p className="close" onClick={props.closeRightbar}>
              <span aria-hidden="true">×</span>
            </p>
          </div>
        </div>
        <div className="is">
          {method === 1 ? (
            <div className="panel-ember">
              <div className="form-group">
                <label className="control-label">Deliver to</label>

                <span
                  className="btn secondry d-block f14"
                  onClick={() => showDelivary()}
                >
                  {address
                    ? address.u_no + "," + address.b_name + "," + address.pcode
                    : " Add my address"}
                  <i className="fa fa-angle-right right"></i>
                </span>
              </div>
              <div className="form-group no">
                <label className="control-label">Delivery Time</label>
                <div className="row xsm">
                  <div className="col-5">
                    <span
                      onClick={() => pickupDateFunction()}
                      className="btn secondry d-block f14"
                    >
                    
                      {order.date ? order.date.slice(0, -4) : "Select date"}
                    </span>
                  </div>
                  <div className="col-7">
                    <span
                      onClick={() => pickupDateFunction()}
                      className="btn secondry d-block f14"
                    >
                      {order.time ? order.time + " : 00" : "Select Time"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="panel-ember">
              <div className="form-group">
                <label className="control-label">Select outlet</label>
                <span
                  className="btn secondry d-block f14"
                  onClick={() => showPickFunction()}
                >
                  {order.out_name ? order.out_name : "Select Outlate"}
                  <i className="fa fa-angle-right right"></i>
                </span>
              </div>
              <div className="form-group no">
                <label className="control-label">Pickup Time</label>

                <div className="row xsm">
                  <div className="col-5">
                    <span
                      onClick={() => pickupDateFunction()}
                      className="btn secondry d-block f14"
                    >
                      {order.date ? order.date.slice(0, -4) : "Select date"}
                    </span>
                  </div>
                  <div className="col-7">
                    <span
                      onClick={() => pickupDateFunction()}
                      className="btn secondry d-block f14"
                    >
                      {order.time ? order.time + " : 00" : "Select Time"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="cart-gutter">
            <div className="cart-head">
              <span className="item">
                {props.cartData && props.cartData.count} Item(s)added
              </span>
              <p onClick={clearCart} className="action btn">
                Clear Items
              </p>
            </div>
            <div className="cart-body">
              {props.add_to_cart &&
                props.add_to_cart.data.cart &&
                props.add_to_cart.data.count > 0 && (
                  <CartRender
                    updateCart={props.updateCart}
                    cdata={props.add_to_cart.data.cart}
                  />
                )}
            </div>
          </div>
          {(!props.add_to_cart || props.add_to_cart.data.count === 0) && (
            <div style={{padding:"40% 0",display: "flex",justifyContent: "center"}} 

 >
              <div  className="empty_cart">
                <img
                  alt="cart"
                  className="align-self-center"
                  width="90px"
                  src={cartImg1}
                  
                />
                <h5>Your cart is empty</h5>
                <p>Add something from the menu!</p>
              </div>
            </div>
          )}
        </div>
        <div className={`cart-foot ${showCartTotal ? "open" : ""}`}>
          <div className="cart-table">
            <table>
              <tbody>
                <tr>
                  <td>Sub Total:</td>
                  <td>{props.add_to_cart? props.add_to_cart.data.sub:''}</td>
                  
                  
                </tr>
                <tr>
                  <td>Delivery charge:</td>
                  <td>
                    {method === 1
                      ? props.add_to_cart && props.add_to_cart.data.d_charge
                      : 0}
                  </td>
                </tr>
                <tr>
                  <td>GST</td>
                  <td>{props.add_to_cart && props.add_to_cart.data.gst}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            className="toggle-action"
            onClick={() => setShowCartTotal(!showCartTotal)}
          >
            {/* <i className="fa fa-angle-up"></i> */}
            <img src={arrowup} alt="arrow-up" />
          </button>
          <div className="ins">
            <button
              onClick={() => {
                ProcessCheckOut();
              }}
              className="btn primary"
            >
              <span>Check out</span>
              <span>|</span>
              <span>
                ${" "}
                {method === 1
                  ? props.add_to_cart && props.add_to_cart.data.sum
                  :  props.add_to_cart &&
                    parseFloat(props.add_to_cart.data.sub) +
                      parseFloat(props.add_to_cart.data.gst)}
              </span>
            </button>
            
          </div>
        </div>
      </div>
      <div
        onClick={props.closeRightbar}
        className={`app-overlay ${show ? "open" : ""}`}
      ></div>
    </div>
  );
};

RightSidebar.propTypes = {
  closeRightbar: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  add_to_cart: state.products.add_to_cart,
  order: state.products.order,
  loading: state.products.loading,
});
export default withTranslation()(
  connect(mapStateToProps, { clearCartSingle, clearCart, placeOrder })(
    RightSidebar, clearCart
  )
);