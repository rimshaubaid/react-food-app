import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "./Step.css";
import close from "../../assets/svgs/close.svg";
import "../../assets/css/modal.css";

const PopUp = ({ show, closeModal, text }) => {
  return (
    <Modal
      show={show}
      onHide={closeModal}
      dialogClassName="modal-smd maxwidth500"
      centered
    >
      <Modal.Body className="p-2">
        <div className="modal-body modal-background d-flex justify-content-center align-items-end">
          <button
            type="button"
            className="close-modal-btn"
            data-dismiss="modal"
            aria-label="Close"
            onClick={closeModal}
          >
            <img src={close} width="20" alt="close" />
          </button>
          <div className="text-white text-center">
            <div className="font-weight-bold f40 claim">{text}</div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer no">
        <button
          type="button"
          className="btn btn-danger claim-button btn-block py-0"
          data-dismiss="modal"
          onClick={closeModal}
        >
          Ok

        </button>
      </Modal.Footer>
    </Modal>
  );
};
PopUp.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
export default PopUp;
