import React,{useState} from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../assets/css/modal.css";
import "./Menu.css";
import "../../assets/css/modal.css";
import menuLogo from "../../assets/svgs/menu-logo.svg";
import {Link} from 'react-router-dom';
import thumb1 from "../../assets/images/thumb1.png";
import thumb2 from "../../assets/images/thumb2.png";
import thumb3 from "../../assets/images/thumb3.png";

const MenuModal = ({ show, closeModal }) => {
  
  if(localStorage.headers){
  var username=JSON.parse(window.localStorage.getItem("headers"));
  var newname=username.data.user.fname}
  return (
    <Modal
      show={show}
      onHide={closeModal}
      className="rounded-lg "
      dialogClassName="modal-md menu res-modal"
      centered
    >
      <Modal.Header className="border-bottom-0">
        <button
          type="button"
          className="close"
          onClick={closeModal}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="head">
          <figure>
            <img src={menuLogo} alt="" />
          </figure>
          <h3>
            Welcome back, <span>{newname}</span>
          </h3>
          <p>Thank you for choosing to dine with us!</p>
        </div>
        <div className="cnts">
          <p>Special discounts for you!</p>
          <div className="img-container">
          <div className="container-fluid">
            <div className="row img-row">
              <div className="col-4">
                <div className="ember">
                  <figure>
                    <img src={thumb1} alt="" />
                  </figure>
                  <div className="caption">
                    <span className="title">$1 Salad</span>
                    <span className="dec">From March 1 to April 1</span>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="ember">
                  <figure>
                    <img src={thumb2} alt="" />
                  </figure>
                  <div className="caption">
                    <span className="title">$1 Salad</span>
                    <span className="dec">From March 1 to April 1</span>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="ember">
                  <figure>
                    <img src={thumb3} alt="" />
                  </figure>
                  <div className="caption">
                    <span className="title">$1 Salad</span>
                    <span className="dec">From March 1 to April 1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        <div className="foot">
          <Link to={"/"} onClick={closeModal} className="btn lg primary">
            Let’s eat!
          </Link>
          <p className="copyright">Powered by Warely</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

MenuModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default MenuModal;
