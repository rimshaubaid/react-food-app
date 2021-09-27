import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

import "../../assets/css/modal.css";
import close from "../../assets/svgs/close.svg";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

const TrackOrderNow = (props) => {
  let show = props.show;

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
          <h3>
            Your Order No. <span>{order.data && order.data.id}</span>
          </h3>
          <div className="opm-data">
            <span>Order Sent : {renderTime()}</span>
            <span>Ref ID : {order.data ? order.data.id : (localStorage.order_id && localStorage.order_id)}</span>
          </div>
        </div>
        <div className="box">
          <button
            href={null}
            className="btn regular d-block xlg"
            onClick={props.trackOrder}
          >
            Track your order now
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

TrackOrderNow.propTypes = {
  closeModal: PropTypes.func.isRequired,
  trackOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.products.order,
  loading: state.products.loading,
});
export default withTranslation()(connect(mapStateToProps, {})(TrackOrderNow));
