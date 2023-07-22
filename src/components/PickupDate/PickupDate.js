import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../assets/css/modal.css";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import PopUp from "../Modals/Popup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import DeliveryModal from '../DeliveryModal/DeliveryModal';
const PickupDate = (props) => {
  let order = props.order;
  let show = props.show;
  const [load, setLoad] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [lshow, setLshow] = useState(false);
  const [startDate,setStartDate] = useState(new Date());
  const [startTime,setStartTime] = useState('12:00');
  const [selectAddress,setAddress]=useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [showPickup, setShowPickup] = useState(false);
  const [showPickupDate, setShowPickupDate] = useState(false);
  useEffect(() => {
    // console.log(props);
    if (
      !props.loading &&
      props.norders &&
      props.norders !== null &&
      props.norders.success &&
      load
    ) {
      // console.log("_____orders____");
      //console.log(props.orders);
      // props.showTrackOrder();
      setLoad(false);
    }
  }, [props, order, load]);

  /*const changeDate = (e) => {
    let oldOrder = order;
    oldOrder["date"] = e.target.value;
    props.setOrder(oldOrder);
    localStorage.setItem("date", e.target.value);
  };*/

const changeDate = (date) => {
  setStartDate(date);
let oldOrder = order;
oldOrder["date"]=date.toDateString();
props.setOrder(oldOrder);
localStorage.setItem("date",date.toDateString());
  }

  const changeTime = (time) => {
    setStartTime(time);
    let oldOrder = order;
    oldOrder["time"] = time;
    props.setOrder(oldOrder);
    localStorage.setItem("time", time);
    console.log(time);
  };

  const rederDate = () => {
    var actualDate = new Date();
    var newDate;
    let dateOption = [];

    for (var i = 1; i <= 7; i++) {
      newDate = new Date(
        actualDate.getFullYear(),
        actualDate.getMonth(),
        actualDate.getDate() + i
      );
      dateOption.push(
        <option key={i} value={newDate.toDateString()}>
          {newDate.toDateString()}
        </option>
      );
    }
    //console.log(newDate.toString());
    return dateOption;
  };
  const rederTime = () => {
    let time = [];
    for (var i = 1; i <= 15; i++) {
      time.push(
        <option key={i} value={i}>
          {i + " : 00"}
        </option>
      );
    }
    return time;
  };
const showDelivary = () => {
   
    setShowDelivery(true);
  };
  const ProceedOrder = () => {
    let oldData = order;
    // console.log(props.cartId());
    if (oldData["date"] && oldData["time"]) {
      console.log("Order ready to be placed!");
      oldData["order_type"] = 2;
      //  oldData["cart_id"] = props.cartId();
      // props.placeOrder(oldData);
      // setLoad(true);
      props.closeModal();
    } else {
     
      setPopupText("Select Date and Time!");
      setLshow(true);
    }

    //props.showTrackOrder();
  };
const pickupDateFunction = () => {
    setShowPickupDate(true);
   
    setShowPickup(false);
  };
  return (
    <Modal
      show={show}
      onHide={props.closeModal}
      dialogClassName="modal-md xs"
      contentClassName="shrink xs"
      centered
    >
      <PopUp
          text={popupText}
          show={lshow}
          closeModal={() => setLshow(false)}
        />
      <Modal.Header>
        <h4 className="modal-title">
          {" "}
          {props.method === 1 ? "Delivery " : "Pick up"}
        </h4>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={props.closeModal}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
      <Modal.Body className="no">
        
        <div className="pdbrd">
          <label className="control-label no">
            Select your {props.method === 1 ? 'delivery' : 'pick up'} <span>Date</span>
          </label>

         {/* <select className="form-control" onChange={changeDate}>
            <option>Select Date</option>
            {rederDate()}
          </select>*/}

          <DatePicker className="form-control" selected={startDate} onChange={changeDate} />
        </div>
        <div className="pdbrd no">
          <label className="control-label no">
            Select your {props.method === 1 ? 'delivery' : 'pick up'} <span>Time</span>
          </label>
         <TimePicker className="form-control" value={startTime} onChange={changeTime} />
        {/*<select className="form-control" onChange={changeTime}>
            <option>Select time</option>
            {rederTime()}
          </select>*/}
        </div>
      </Modal.Body>
      <Modal.Footer className="form-action no">
        <button className="btn lg primary d-block" onClick={ProceedOrder}>
          Proceed
        </button>
      </Modal.Footer>
    </Modal>
  );
};

PickupDate.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  norders: state.products.order,
  loading: state.products.loading,
});
export default withTranslation()(connect(mapStateToProps, {})(PickupDate));