import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../assets/css/icon.css";
import "../../assets/css/bundle.css";
import "../../assets/css/component.css";

import { useForm } from "react-hook-form";

const DeliveryModal = ({loginRef, showPickupDate, setAddress, show, closeModal }) => {
  const { register, handleSubmit } = useForm();
 
  const myRef = useRef();
  const onSubmit = (data) => {
    setAddress(data);
    closeModal();
    showPickupDate();
   

    localStorage.setItem("d_address", JSON.stringify(data));
  };

  const redurectLogin = () => {

    loginRef.current.dispatchEvent(
      new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      }),
    );
    closeModal();
  
  };
  return (
    <Modal show={show} onHide={closeModal} dialogClassName="delivery" centered>
      <Modal.Header>
        <Modal.Title>Your delivery address</Modal.Title>
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
      <Modal.Body className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          {!localStorage.login && (
            <div
              onClick={() => redurectLogin(myRef)}
              className="head-info mb-5"
            >
              Login for faster check out next time
            </div>
          )}
          <div className="form-group">
            <label className="control-label">Postal Code</label>
            <div className="search-box">
              
              <input
                className="form-control"
                type="search"
                required
                {...register("pcode")}
                placeholder="Enter your postal code or street address"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-7">
              <div className="form-group">
                <input
                  required
                  {...register("b_name")}
                  className="form-control"
                  type="text"
                  placeholder="Building name"
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <input
                  required
                  {...register("u_no")}
                  className="form-control"
                  type="text"
                  placeholder="Unit No."
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label">Note</label>
            <textarea {...register("note")} className="form-control"></textarea>
          </div>
          <div className="form-action mt-5">
            <button className="btn lg primary d-block">
              Select Date & Time
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
DeliveryModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
export default DeliveryModal;
