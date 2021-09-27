import React, { useState, useEffect, useRef } from "react";
import "./Payment.css";
import "../../assets/css/modal.css";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { SingleOrder, submitPayment } from "../../actions/productActions";
import OrderPlaced from "../../components/OrderPlaced/OrderPlaced";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import TrackOrder from "../../components/TrackOrder/TrackOrder";
import TrackOrderNow from "../../components/TrackOrderNow/TrackOrderNow";
import {Link} from 'react-router-dom';
import StripePayment from './CardMinimal';
import { useLocation } from "react-router-dom";
import axios from 'axios';
const Payment = (props) => {
  
  const myRef = useRef();
  const { id } = useParams();
  const location = useLocation();
  const [load, setLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderType, setOrderType] = useState(1);
  const [local, setLocal] = useState([]);
  const [user, setUser] = useState([]);
  const [udata, setUdata] = useState(false);
  const [showOrderPlaced, setShowOrderPlaced] = useState(false);

  const [showtrackOrder, setShowTrackOrder] = useState(false);
  const [showTrackNow, setShowTracknow] = useState(false);
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  
  const onSubmit = (data,event) => {
    
    // if(!data.a_tos){

    // }
    // if(!data.u_offers){

    // }
    // console.log(data);
    event.preventDefault();
    if (localStorage.login) {
      props.submitPayment(data);
      
     history.push({
      pathname:'/stripe',
       //state:{totalSum: props.payment.data.order_type===2? ()}
       state:{totalSum: orderType === 2 ? (location.state.data.sum) - (location.state.data.d_charge)
                              : location.state.data.sum ,
                                orderId:props.payment?props.payment.data.id:orders.id,
                                orderTypee:orderType
                              }
    })
    } else {
      props.submitPayment({ ...data, local });
      if(orderType === 1){
      axios.post("http://devfood.appvelo.com/api/orderPlace")
      .then(res => console.log("accept this order from dashboard",res.data.data[0].orderRef))
      .catch(err => console.log(err.response))
    }}
    
    setLoaded(true);
    
  };

  useEffect(() => {
    
    
    if (
      !props.loading &&
      props.orders !== null &&
      Object.keys(props.orders.data).length > 0 &&
      props.orders.success &&
      load
    ) {
      setOrders(props.orders.data[0]);
      setLoad(true);
      
    }

    if (!load) {
      if (localStorage.login) {
        props.SingleOrder(id);
        setLoad(true);
        if (localStorage.headers) {
          let userData = JSON.parse(localStorage.headers);
          setUser(userData.data.user);
        }
        setUdata(true);
        setOrderType(parseInt(localStorage.getItem("order_type")));
      } else {
        setUdata(true);

        if (localStorage.cart_data) {
          setLocal(JSON.parse(localStorage.cart_data));
        }
        if (localStorage.order_type) {
          setOrderType(parseInt(localStorage.getItem("order_type")));
        }
      }
    }

    if (
      !props.loading &&
      props.payment !== null &&
      Object.keys(props.payment.data).length > 0 &&
      loaded
    ) {
      if (localStorage.headers) {
        let userData = JSON.parse(localStorage.headers);
        userData.data.user = props.payment.data && props.payment.data.user_info;
        localStorage.setItem("headers", JSON.stringify(userData));
        setUser(userData.data.user);
       
      }
      setShowOrderPlaced(true);
      localStorage.setItem("order_id", props.payment.data.id);
      setLoaded(false);
      setOrders(props.payment.data);
      props.updateCart(null);
      console.log('update cart call from payment');
      //history.push("/");
      
      history.push({
      pathname:'/stripe',
       //state:{totalSum: props.payment.data.order_type===2? ()}
       state:{totalSum: orderType === 2 ? (location.state.data.sum) - (location.state.data.d_charge)
                              : location.state.data.sum ,
                                orderId:props.payment?props.payment.data.id:orders.id,
                                orderTypee:orderType
                              }
    })
    }
    
  }, [orders.id, history, id, load, loaded, props, orderType, location.state.data.sum, location.state.data.d_charge]);

  const conAddress = (address) => {
    let re_address = [];
    if (address !== null && address !== "") {
      let address_arr = JSON.parse(address);
      re_address.push(
        <>
          <p>
            {address_arr.u_no},{address_arr.b_name},{address_arr.pcode}
          </p>
          <span>{address_arr.note}</span>{" "}
        </>
      );
    }

    return re_address;
  };
  const conDate = (conDate) => {
    let re_date = "";
    if (conDate !== null) {
      let date = new Date(conDate);

      return date.toDateString();
    }
    return re_date;
  };
  const showTrackOrderNowFunction = () => {
    setShowTrackOrder(false);
    setShowTracknow(true);
  };
  const trackOrderPage = () => {
    setShowTracknow(true);
    history.push("/track-order/"+orders.id);
  };
  const showTrackOrder = () => {
    setShowOrderPlaced(false);
    setShowTrackOrder(true);
  };

  const closePlaceorder = () =>{
    setShowOrderPlaced(false);
    console.log('close place order');
  }

  return (
    <div className="main_section">
      <div className="payment-gutter">
     
        <OrderPlaced
          regRef={props.regRef}
          orders={orders}
          show={showOrderPlaced}
          closeModal={() => closePlaceorder(false)}
          TrackOrder={() => showTrackOrder()}
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
        {udata && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="form-body">
                
                    
                    <div className="form-group">
                      
                      {localStorage.login && (
                        <input
                          {...register("order_id", {
                            value: id && id,
                          })}
                          type="hidden"
                          className="form-control"
                          
                        />
                      )}
                      <input
                        required
                        {...register("card_name")}
                        type="hidden"
                        className="form-control"
                        value="rimsha"
                      />
                    </div>
                    <div className="form-group">
                      
                      <input
                        required
                        {...register("card_number")}
                        type="hidden"
                        className="form-control"
                        value="123456"
                      />
                    </div>
                    <div className="row xsm">
                      <div className="col-md-6">
                        <div className="form-group">
                          
                          <input
                            required
                            {...register("ccv")}
                            type="hidden"
                            className="form-control"
                            value="123"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          
                          <div className="row">
                            <div className="col-6">
                              <input
                                required
                                {...register("e_date_m")}
                                type="hidden"
                                className="form-control"
                                placeholder="MM"
                                value="12"
                              />
                            </div>
                            <div className="col-6">
                              <input
                                {...register("e_date_y")}
                                type="hidden"
                                className="form-control"
                                placeholder="YY"
                                value="12"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                  <div className="box">
                    <div className="heading">
                      <h2>Billing address</h2>
                    </div>
                    <div className="row xsm">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label">First Name</label>
                          <input
                            {...register("fname", {
                              required: true,
                              value: user.fname ? user.fname : null,
                            })}
                            type="text"
                            className="form-control"

                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label">Last Name</label>
                          <input
                            {...register("lname", {
                              required: true,
                              value: user.lname ? user.lname : null,
                            })}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Gender</label>
                      <div className="app-radio-inline">
                        <label className="app-radio">
                          {" "}
                          Male
                          <input
                            {...register("gender")}
                            type="radio"
                            value="1"
                            defaultChecked
                          />
                          <span></span>
                        </label>
                        <label className="app-radio">
                          {" "}
                          Female
                          <input
                            {...register("gender")}
                            type="radio"
                            value="2"
                          />
                          <span></span>
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Billing Address</label>
                      <input
                        required
                        {...register("address", {
                          required: true,
                          value: user.address ? user.address : null,
                        })}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="control-label">City</label>
                      <input
                        required
                        {...register("city", {
                          required: true,
                          value: user.city ? user.city : null,
                        })}
                        type="text"
                        defaultValue={user.city ? user.city : null}
                        className="form-control"
                      />
                    </div>
                    <div className="row xsm">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label">ZIP Code</label>
                          <input
                            required
                            {...register("zip", {
                              required: true,
                              value: user.zip ? user.zip : null,
                            })}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label">Country</label>
                          <input
                            required
                            {...register("country", {
                              required: true,
                              value: user.country ? user.country : null,
                            })}
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Phone</label>
                      <div className="input-group fixed">
                        <div className="sm">
                          <select className="form-control">
                            <option value="1">SG</option>
                          </select>
                        </div>
                        <input
                          required
                          {...register("phone", {
                            required: true,
                            value: user.phone ? user.phone : null,
                          })}
                          minLength="11"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">Email</label>
                      <input
                        required
                        {...register("email", {
                          required: true,
                          value: user.email ? user.email : null,
                        })}
                        type="text"
                        {...(user.email && "readOnly")}
                        className="form-control"
                      />
                      {localStorage.time && (
                        <input
                          required
                          {...register("time", {
                            required: true,
                            value: localStorage.time ? localStorage.time : null,
                          })}
                          type="hidden"
                          className="form-control"
                        />
                      )}
                      {localStorage.date && (
                        <input
                          required
                          {...register("date", {
                            required: true,
                            value: localStorage.date ? localStorage.date : null,
                          })}
                          type="hidden"
                          className="form-control"
                        />
                      )}
                      {localStorage.outlate && (
                        <input
                          required
                          {...register("outlate", {
                            required: true,
                            value: localStorage.outlate
                              ? localStorage.outlate
                              : null,
                          })}
                          type="hidden"
                          className="form-control"
                        />
                      )}
                      {localStorage.d_address && (
                        <input
                          required
                          {...register("d_address", {
                            required: true,
                            value: localStorage.d_address
                              ? localStorage.d_address
                              : null,
                          })}
                          type="hidden"
                          className="form-control"
                        />
                      )}
                      {localStorage.order_type && (
                        <input
                          required
                          {...register("order_type", {
                            required: true,
                            value: localStorage.order_type
                              ? localStorage.order_type
                              : null,
                          })}
                          type="hidden"
                          className="form-control"
                        />
                      )}
                    </div>
                    <div className="form-group">
                      <div className="app-radio-list">
                        <label className="app-checkbox is">
                          {" "}
                          I accept the Terms & Conditions and Privacy Policy
                          <input
                            required
                            {...register("a_tos")}
                            type="checkbox"
                          />
                          <span></span>
                        </label>
                        <label className="app-checkbox is">
                          {" "}
                          Update me on the occasional offers
                          <input
                            
                            {...register("u_offers")}
                            type="checkbox"
                          />
                          <span></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-action t2">
                    <button type="submit" className="btn primary">
                     Place Order
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-6 ">
                <div className="d-none d-md-block details-body">
                  <a href="/" className="close circle">
                    <span></span>
                  </a>
                  <div className="heading">
                    <h2>Order details</h2>
                  </div>
                  <ul className="value-list">
                    <li>
                      <span className="txt">Total items</span>
                      <span className="value">
                      {location.state.data.count}
                        {console.log(location.state.data.count)}
                      </span>
                    </li>
                    <li>
                      <span className="txt">Sub total</span>
                      <span className="value">
                        $
                       {location.state.data.sub}
                      </span>
                    </li>
                    {(orders.order_type && orders.order_type.id === 1) ||
                    orderType === 1 ? (
                      <>
                        <li>
                          <span className="txt">Delivery Charges</span>
                          <span className="value">
                            $ 
                           {location.state.data.d_charge}
                          </span>
                        </li>
                        <li>
                          <span className="txt">GST</span>
                          <span className="value">
                            $
                            {location.state.data.gst}
                          </span>
                        </li>
                        <li className="total">
                          <span className="txt">Order Total:</span>
                          <span className="value">
                            $
                            {location.state.data.sum}
                          </span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <span className="txt">GST</span>
                          <span className="value">
                            $
                            {location.state.data.gst}
                          </span>
                        </li>
                        <li className="total">
                          <span className="txt">Order Total:</span>
                          <span className="value">
                            $
                            {(location.state.data.sum) - (location.state.data.d_charge)}
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                  <div className="data">
                    <div className="mb-3">
                      <h3>
                        {" "}
                        {orderType === 1
                          ? "Delivery details"
                          : "Pickup details"}
                      </h3>
                    </div>
                    <div className="mb-3">
                      <p>
                        {/* {orders.d_address ? conAddress(orders.d_address)  : (orderType === 1)  ? conAddress(localStorage.getItem("d_address")) : localStorage.getItem("out_name")} */}

                        {orderType === 1
                          ? conAddress(localStorage.getItem("d_address"))
                          : localStorage.getItem("out_name")}
                      </p>
                    </div>
                    <div className="mb-3">
                      <p>
                        {orders.date
                          ? conDate(orders.date)
                          : localStorage.date &&
                            conDate(localStorage.getItem("date"))}
                      </p>
                    </div>
                    <p>
                      {orders.time
                        ? orders.time + " : 00 "
                        : localStorage.time &&
                          localStorage.getItem("time") + " : 00"}
                    </p>
                  </div>
                </div>
              </div>


            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.products.order,
  payment: state.products.payment,

  loading: state.products.loading,
});
export default withTranslation()(
  connect(mapStateToProps, { SingleOrder, submitPayment })(Payment)
);
