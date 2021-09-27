import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import {  useHistory } from "react-router-dom";
import "../../assets/css/modal.css";
import van from "../../assets/svgs/van.svg";
import close from "../../assets/svgs/close.svg";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

const TrackOrder = (props) => {
  let show = props.show;
const history=useHistory();
  const [order, setOrder] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (
      !props.loading &&
      props.order !== null &&
      Object.keys(props.order.data).length > 0 &&
      !load
    ) {
      props.order && setOrder(props.order);
      setLoad(true);
    }
  }, [props, order, load]);

  const renderTime = () => {
    let date = new Date();
 
    return date.toDateString();
  };

  return (
    <Modal
      show={props.show}
      onHide={props.closeModal}
      className="rounded-lg "
      dialogClassName="modal-md maxwidth500"
      contentClassName="track-modal"
      centered
    >
      <Modal.Header className="alpha">
        <button
          onClick={props.closeModal}
          type="button"
          className="close circle"
          data-dismiss="modal"
          aria-label="Close"
        >
          {/* <span aria-hidden="true">&times;</span> */}
          <img src={close} width="20" alt="close" />
        </button>
      </Modal.Header>
      <Modal.Body className="no">
        <div className="box brd">
          <figure>
            <span>W</span>
            <img src={van} alt="" />
          </figure>
          <div className="opm-data">
            <span>Order Sent : {renderTime()}</span>
            <span>Ref ID : {props.orderType}</span>
          </div>
        </div>
        <div className="box">
          <button
            className="btn regular d-block xlg"
            onClick={() => history.push('/track-order')}
          >
            Track your order now
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  order: state.products.order,
  loading: state.products.loading,
});
export default withTranslation()(connect(mapStateToProps, {})(TrackOrder));
