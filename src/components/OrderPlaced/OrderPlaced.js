import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../assets/css/icon.css";
import "../../assets/css/bundle.css";
import "../../assets/css/component.css";
import "../../assets/css/btn.css";
import "./OrderPlaced.css";
import Rider from '../Rider/Rider';
import thumb5 from "../../assets/images/thumb5.png";
import close from "../../assets/svgs/close.svg";

import TrackOrder from '../TrackOrder/TrackOrder';
import axios from 'axios';
const OrderPlaced = ({ orders, orderTy, regRef, show, closeModal }) => {

  const [orderRef,setorderRef]=React.useState(false);
  const [isRider,setRider]=React.useState(false);
  const[showtrackOrder,setShowTrackOrder]=React.useState(false);
  const authURL = process.env.REACT_APP_API_BASE_URL;

  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  function handleClick(){
    closeModal();
  }
 // const orderButton = (myref) => {
   
    // if (localStorage.login) {
    //   TrackOrder();
    // } else {
    //   regRef.current.dispatchEvent(
    //     new MouseEvent("click", {
    //       view: window,
    //       bubbles: true,
    //       cancelable: true,
    //       buttons: 1,
    //     })
    //   );
    //   closeModal();
    // }
  //};
  

function handleClickk(){
  axios.get(authURL + "orders/" + orders)
  .then(res => setorderRef(res.data.data[0].order_id))
  .catch(err => {
    let error;
    if(err.response && err.response.data){
      error=err.response.data;
    } else {
      error=null;
    }
    console.log(error)
  })
  setRider(true);
  setShowTrackOrder(true);
}

  return (
    <Modal
      show={show}
      onHide={closeModal}
      className="rounded-lg"
      dialogClassName="modal-smd"
      centered
    >
      <Modal.Header className="alpha">
        <button
          type="button"
          className="close-modal-btn mr-3 close-z"
          data-dismiss="modal"
          aria-label="Close"
          onClick={handleClick}
        >
          <img src={close} width="20" alt="close" />
        </button>
      </Modal.Header>
      <Modal.Body className="pd20">
        <div className="ember radius lg">
          <figure>
            <img src={thumb5} alt="" />
          </figure>
          <div className="caption">
            <span className="title">Set A ( 50% off )</span>
            <span className="dec">On your next order</span>
          </div>
        </div>
        <button
          onClick={handleClickk}
          className="btn regular xlg fw-right mt-5"
        >
          Order successfully placed <i className="double-check-icon"> </i>
        </button>
        {orderTy===1?<Rider orderNum={orderRef} show={isRider} onHide={() => setRider(false)}/>:<TrackOrder orderType={orders}
          show={showtrackOrder}
          closeModal={() => setShowTrackOrder(false)}
         
        />}
        
        <div className="opm-data">
          <span>
            Order Sent : {formatAMPM(new Date())}
          </span>
          <span>Order ID : {orders}</span>
        </div>
      </Modal.Body>
    </Modal>
  );
};
OrderPlaced.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
export default OrderPlaced;
