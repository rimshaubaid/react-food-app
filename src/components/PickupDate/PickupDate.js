import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../assets/css/modal.css";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import PopUp from "../Modals/Popup";


const PickupDate = (props) => {
  let order = props.order;
  let show = props.show;
  const [load, setLoad] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [lshow, setLshow] = useState(false);

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

  const changeDate = (e) => {
    let oldOrder = order;
    oldOrder["date"] = e.target.value;
    props.setOrder(oldOrder);
    localStorage.setItem("date", e.target.value);
  };
  const changeTime = (e) => {
    let oldOrder = order;
    oldOrder["time"] = e.target.value;
    props.setOrder(oldOrder);
    localStorage.setItem("time", e.target.value);
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
        <div className="panel-ember">
          <label className="control-label">
            {" "}
            {props.method === 1 ? "Selected address " : "Selected outlet"}{" "}
          </label>
          <span className="btn secondry d-block">
            {props.method === 1
              ? props.address
                ? props.address.u_no +
                  "," +
                  props.address.b_name +
                  "," +
                  props.address.pcode
                : "Please select address"
              : order.out_name}
          </span>
        </div>
        <div className="pdbrd">
          <label className="control-label no">
            Select your {props.method === 1 ? 'delivery' : 'pick up'} <span>Date</span>
          </label>

          <select className="form-control" onChange={changeDate}>
            <option>Select Date</option>
            {rederDate()}
          </select>
        </div>
        <div className="pdbrd no">
          <label className="control-label no">
            Select your {props.method === 1 ? 'delivery' : 'pick up'} <span>Time</span>
          </label>
          <select className="form-control" onChange={changeTime}>
            <option>Select time</option>
            {rederTime()}
          </select>
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