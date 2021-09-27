import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Order-history.css";
import "../../assets/css/modal.css";

import { Accordion, Card, Button } from "react-bootstrap";

import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { MyOrders, Reorder } from "../../actions/productActions";

const OrderHistory = (props) => {
  const [load, setLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [orders, setOrders] = useState([]);
  const [aclass, setAclass] = useState(-1);
  const [rorder, setRorder] = useState(-1);
  const { id } = useParams();
  const history = useHistory();
  
  useEffect(() => {
    if (
      !props.loading &&
      props.reorders !== null &&
      props.reorders.success &&
      !loaded
    ) {
      setOrders(props.reorders.data);
      setLoaded(true);
      window.location.reload();
      //history.push("/order-history/" + rorder);
      //setOrderActive(rorder);
      // alert("Re-Order Successfully!");

      //  id ? setOrderActive(id) : setOrderActive(props.orders.data[0].id);
    }

    if (
      !props.loading &&
      props.orders !== null &&
      Object.keys(props.orders.data).length > 0 &&
      props.orders.success &&
      !loaded
    ) {
      setOrders(props.orders.data);
      setLoaded(true);

      id ? setOrderActive(id) : setOrderActive(props.orders.data[0].id);
      // if (rorder) {
      //   setOrderActive(rorder);
      // } else if (id) {
      //   setOrderActive(id);
      // } else {
      //   setOrderActive(props.orders.data[0].id);
      // }
    }

    if (!load) {
      props.MyOrders();
      setLoad(true);
    }
  }, [history, id, load, loaded, orders, props, rorder]);

  let variationRender = (variation) => {
    let html = [];
    if (variation && variation.length > 0) {
      let data = variation;
      Object.keys(data).forEach(function (key) {
        html.push(<span key={key}>{data[key].name}</span>);
      });
    }
    return html;
  };

  let RenderCart = (cart) => {
    let html = [];
    if (cart && cart.length > 0) {
      let data = cart;
      Object.keys(data).forEach(function (key) {
        html.push(
          <tr key={key}>
            <td> {data[key].quantity} x</td>
            <td>
              <>
                {" "}
                {data[key].product &&
                  data[key].product[0] &&
                  data[key].product[0].name}{" "}
                {variationRender(data[key].cat_variation)}{" "}
              </>
            </td>
            <td> {parseFloat(data[key].price).toFixed(2)}</td>
          </tr>
        );
      });
    }
    return html;
  };

  let reorder = (e, id) => {
    props.Reorder(id);
    setLoaded(false);
    setRorder(id);
    e.target.value = "In progress";
  };

  const setOrderActive = (index) => {
    console.log("Active orders" + index);
    setAclass(parseInt(index));
  };

  const checkJson = (text) => {
    if (
      /^[\],:{}\s]*$/.test(
        text
          .replace(/\\["\\\/bfnrtu]/g, "@")
          .replace(
            /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            "]"
          )
          .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
      )
    ) {
      return true;
      //the json is ok
    } else {
      //the json is not ok
      return false;
    }
  };

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
  let RenderOrders = () => {
    let html = [];
    if (orders && orders.length > 0) {
      orders.map((key, index) => {
        var inkey = parseInt(key.id);
        var cdate = new Date(key.created_at);
        var adate = new Date(key.date);

        let htmltemp = (
          <Card key={inkey}>
            <Accordion.Toggle
              as={Button}
              onClick={() => setOrderActive(inkey)}
              variant={aclass === inkey ? "danger" : "light"}
              eventKey={inkey}
            >
              <span className="date">{cdate.toDateString()}</span>
              {/* <span className="time pl-2">15:30</span> */}

              <i className="fa fa-caret-down"></i>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={inkey}>
              <Card.Body>
                <div className="row">
                  <div className="col-md-6">
                    <div className="table-box">
                      <table className="table">
                        <tbody>{RenderCart(key.cart)}</tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="item-box">
                      <div className="form-group">
                        <label className="control-label">
                       
                          {key.order_type === 1
                            ? " Deliver to"
                            : "Pick up from"}
                        </label>
                        <span className="form-control-static">
                          {key.outlate
                            ? key.outlate.name && key.outlate.name
                            : key.d_address && conAddress(key.d_address)}
                        </span>
                      </div>
                      {key.order_type.id === 1 ? (
                        <div className="form-group">
                          <label className="control-label">
                            Estimated Arrival
                          </label>
                          <span className="form-control-static disabled">
                            <span className="date">{adate.toDateString()}</span>
                            <span className="time">
                              {key.time && key.time + " : 00"}
                            </span>
                          </span>
                        </div>
                      ) : (
                        <div className="form-group">
                          <label className="control-label">Pickup time</label>
                          <span className="form-control-static disabled">
                            <span className="date">{adate.toDateString()}</span>
                            <span className="time">
                              {key.time && key.time + " : 00"}
                            </span>
                          </span>
                        </div>
                      )}
                      {/* <div className="form-group">
                        <label className="control-label">
                        {key.order_type.id === 1
                            ? " Deliver time"
                            : 'Pick up time' 
                            }
                          
                         </label>
                        <span className="form-control-static">
                          <span className="date">{adate.toDateString()}</span>
                          <span className="time">
                            {key.time && key.time + " : 00"}
                          </span>
                        </span>
                      </div> */}
                      {/* <div className="form-group">
                        <label className="control-label">Payment</label>
                        <span className="form-control-static">
                          VISA **** **** **** 1234
                        </span>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-action t3">
                      {key.status === 0 ? (
                        <input
                          type="button"
                          className="btn primary"
                          onClick={(e) => reorder(e, key.id)}
                          value="REORDER"
                        />
                      ) : (
                        <span>In progress</span>
                      )}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
        if (id) {
          if (parseInt(id) === inkey) html.push(htmltemp);
        } else {
          html.push(htmltemp);
        }
      });
    }
    return html;
  };

  return (
    <div className="main_section">
      <div className="order-gutter ispd">
        {orders && orders.length > 0 ? (
          <Accordion defaultActiveKey={id ? parseInt(id) : orders[0].id}>
            {" "}
            {RenderOrders()}
          </Accordion>
        ) : (
          <h5 className="text-center">No Order Placed yet</h5>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  orders: state.products.orders,
  reorders: state.products.reorders,
  loading: state.products.loading,
});

export default withTranslation()(
  connect(mapStateToProps, { MyOrders, Reorder })(OrderHistory)
);
