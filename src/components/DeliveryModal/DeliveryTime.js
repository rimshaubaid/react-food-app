import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../assets/css/icon.css";
import "../../assets/css/bundle.css";
import "../../assets/css/component.css";
import "../../assets/css/btn.css";
import "../../assets/css/modal.css";


const DeliveryTime = ({ show, closeModal }) => {
  return (
    <Modal show={show} onHide={closeModal} dialogClassName="delivery" centered>
      <Modal.Header>
        <Modal.Title>Your delivery time</Modal.Title>
        {/* <h4 className="modal-title"></h4> */}
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={closeModal}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
      <Modal.Body className="no">
        <div className="panel-ember">
          <label className="control-label">Deliver to</label>
          <span className="btn secondry d-block">
            Jurong west st 65 blk 671-A #123-123
          </span>
        </div>
        <div className="pdbrd px-3">
          <label className="control-label no">
            Select your delivery <span>Date</span>
          </label>
          <select className="form-control">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div className="pdbrd no">
          <label className="control-label no">
            Select your delivery <span>Date</span>
          </label>
          <select className="form-control">
            <option value="Today">Today, 5 May</option>
          </select>
        </div>
        <div className="form-action mt-5 pd30">
          <a href="" className="btn lg primary d-block">
            Select Date & Time
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
};
DeliveryTime.propTypes = {
  closeModal: PropTypes.func.isRequired
};
export default DeliveryTime;
