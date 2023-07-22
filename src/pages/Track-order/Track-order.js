import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Track-order.css";
import "../../assets/css/modal.css";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { SingleOrder } from "../../actions/productActions";
import { useForm } from "react-hook-form";
import axios from 'axios';

const TrackOrder = (props) => {
  const authURL = process.env.REACT_APP_API_BASE_URL;
  const [order, setOrder] = useState(null);
  const [load, setLoad] = useState(false);
  const [orderRefNum,setorderRefNum]=useState(null);
  const [driver,setDriver]=useState(null);
   const [orderPlaced, setorderPlaced] = useState(false);
   const [orderStatus,setorderStatus]=useState(null);
  const { id } = useParams();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    
    if (
      load &&
      !props.loading &&
      props.order &&
      props.order.data[0] &&
      Object.keys(props.order.data[0]).length > 0
    ) {
      props.order && setOrder(props.order.data[0]);
    }

    if (!load) {
      props.SingleOrder(id);
      setLoad(true);
    }

    
  }, [props, order, load, id]);

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
  const onSubmit = (data) => { 
    props.SingleOrder(data.order_id);
    setLoad(true);
    setorderPlaced(false);
    history.push("/track-order/"+data.order_id);
    
    axios.get(authURL + "orders/" + data.order_id)
   .then(res => {
      console.log(res.data)
  
      axios.get(authURL + "driversLocation",{params:{orderid:res.data.data[0].order_id,driverid:res.data.data[0].driver_id}})
   .then(response => {
         setDriver(true);
       console.log(driver);
     console.log(response.data);
    
     axios.get(
       authURL + "orderDetails",{params:{id:res.data.data[0].order_id}})
       .then(res => console.log(res.data.data.status))
       .catch(err => console.log(err.response))
   })
   
  }
   )
   .catch(err => console.log(err))
   
  }
  return (
    <div className="main_section">
      <div className="track-gutter ispd">
        {!props.loading && order ? (
          <div className="ins">
            <div className="panel-ember">
              <div className="data">
                <label className="control-label">Your order number</label>
                <span className="form-control-static">
                  {" "}
                  {order.id && order.id}
                </span>
              </div>
              <a
                href={order.id && "/order-history/" + order.id}
                className="btn primary"
              >
                View order
              </a>
            </div>
            {order && order.order_type && order.order_type.id === 1 ? (
              <>
                <ul key={1} className="step-list">
                  <li
                    className={
                      order.status === 1 || order.status === null
                        ? "active"
                        : ""
                    }
                  >
                    <span>Assigning Driver</span>
                  </li>
                  {console.log('status',order.status)}
                  <li className={driver ? "active" : ""}>
                    <span>On Going</span>
                  </li>
                  <li className={order.status === 3 ? "active" : ""}>
                    <span>Picked Up</span>
                  </li>
                  <li className={order.status === 4 ? "active" : ""}>
                    <span>Completed</span>
                  </li>
                </ul>

                <div key={2} className="box">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="item-box">
                        <div className="form-group">
                          <label className="control-label">Deliver To</label>
                          <span className="form-control-static">
                            {order.d_address && conAddress(order.d_address)}
                          </span>
                        </div>
                        <div className="form-group">
                          <label className="control-label">
                            Estimated Arrival
                          </label>
                          <span className="form-control-static disabled">
                            <span className="date">
                              {order.date && conDate(order.date)}
                            </span>
                            <span className="time">
                              {order.time && order.time} : 00{" "}
                            </span>
                          </span>
                        </div>
                        {/* <div className="form-group">
                    <label className="control-label">Payment</label>
                    <span className="form-control-static">
                      VISA **** **** **** 1234
                    </span>
                  </div> */}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="item-box">
                        <div className="form-group">
                          <label className="control-label">Contact us:</label>
                          <span className="form-control-static-call">
                            1800 1234 1234
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <ul key={1} className="step-list">
                  <li
                    className={
                      order && (order.status === 1 || order.status === null)
                        ? "active"
                        : ""
                    }
                  >
                    <span>Order Received</span>
                  </li>
                  <li className={order && order.status === 5 ? "active" : ""}>
                    <span>Collected</span>
                  </li>
                </ul>
                <div key={2} className="box">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="item-box">
                        <div className="form-group">
                          <label className="control-label">Pick up from</label>
                          <span className="form-control-static">
                            {order && order.outlate && order.outlate.name}
                          </span>
                        </div>
                        <div className="form-group">
                          <label className="control-label">
                            Estimated Arrival
                          </label>
                          <span className="form-control-static disabled">
                            <span className="date">
                              {order && order.date && conDate(order.date)}
                            </span>
                            <span className="time">
                              {order && order.time && order.time} : 00{" "}
                            </span>
                          </span>
                        </div>
                        {/* <div className="form-group">
                    <label className="control-label">Payment</label>
                    <span className="form-control-static">
                      VISA **** **** **** 1234
                    </span>
                  </div> */}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="item-box">
                        <div className="form-group">
                          <label className="control-label">Contact us:</label>
                          <span className="form-control-static-call">
                            1800 1234 1234
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          !props.loading && (
            <>
              <h5 className="text-center"> Order not found</h5>
              <div
                style={{
                  width: "400px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <div className="form-group pt-5">
                  <label className="control-label">Tracking Order</label>
                  <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    required
                    {...register("order_id")}
                    className="form-control"
                  />
                  <button type="submit" className="btn primary mt-3">
                    Track Order
                  </button>
                  </form>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.products.order,
  loading: state.products.loading,
});
export default withTranslation()(
  connect(mapStateToProps, { SingleOrder })(TrackOrder)
);
