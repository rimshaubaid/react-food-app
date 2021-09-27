import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

import "./orderItem.css";
import "./button.css";
import "../../assets/css/modal.css";
import "../../assets/css/modal.css";
import thumb4 from "../../assets/images/thumb4.png";
import { addTocart, cartLocal } from "../../actions/productActions";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
const ChooseModal = (props) => {
  const [price, setPrice] = useState(0);
  const [variation, setvariation] = useState([]);
  const [loded, setLoded] = useState(false);
  const [addCart, setaddCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  let product = props.product;
  let show = props.show;
  
   
  useEffect(() => {
    if (
      loded &&
      !props.loading &&
      props.add_to_cart !== null &&
      props.add_to_cart.data &&
      Object.keys(props.add_to_cart.data).length > 0
    ) {
    
      props.updateCart(props.add_to_cart.data);
      let data = {
        cart_id: props.add_to_cart.data.cart[0].id,
      };
      props.setOrder(data);
      // props.showPickupModal();
      setLoded(false);
      props.setLshow(true);

      props.closeModal();
      setPrice(0);
      setQuantity(1);
      setvariation([]);
     
    }
  }, [addCart, loded, props]);

  const selectVariation = (e, id, newprice) => {
    if (e.target.checked) {
      let sprice = price + newprice;
      setPrice(sprice);
      setvariation([...variation, id]);
      //console.log("id: ", id);
    } else {
      let sprice = price - newprice;
      setPrice(sprice);
      var varIndex = variation.indexOf(id);
      variation.splice(varIndex, 1);
      setvariation(variation);
    }

    // console.log(id);
  };

  const renderVariation = () => {
    let html = [];

    if (product && Object.keys(product.variation).length > 0) {
      let data = product.variation;

      Object.keys(data).forEach(function (key) {
        //console.log(data[key]);
        let vari = data[key];
        html.push(
          <tr key={key}>
            <td>
              <label className="app-checkbox">
                {vari.name}

                <input
                  type="checkbox"
                  onChange={(e) =>
                    selectVariation(e, vari.id, parseFloat(vari.price))
                  }
                  value={vari.id}
                  name="variations[]"
                />
                <span></span>
              </label>
            </td>
            <td>+${vari.price}</td>
          </tr>
        );
      });
    }
    //  console.log(menus);

    return html;
  };

  const addCartLocal = (data) => {
    var b = [];
    if (localStorage.cart) {
      b = JSON.parse(localStorage.getItem("cart")) || [];
      b.push(data);
      localStorage.setItem("cart", JSON.stringify(b));
    } else {
      b = JSON.parse(localStorage.getItem("cart")) || [];
      b.push(data);
      localStorage.setItem("cart", JSON.stringify(b));
    }

    props.cartLocal(b);
  };

  const addTocarts = () => {
    let data = {
      product_id: product.id,
      quantity: quantity,
      variation_id: variation.join(),
      price: quantity * (parseFloat(product.price) + price),
      vari_price: price,
    };
    if (localStorage.login) {
      setLoded(true);
     
      props.addTocart(data);
    } else {
      setLoded(true);
      addCartLocal(data);
      
      props.closeModal();
      setPrice(0);
      setQuantity(1);
      setvariation([]);
    }
    //  props.showPickupModal();
  };
  const changeQty = (status) => {
    
    let oldQty = quantity;
    if (status) {
      oldQty = oldQty + 1;
    } else {
      oldQty = oldQty - 1;
    }
    if (oldQty > 0) {
      setQuantity(oldQty);
    }
  };
  const closeModel = () => {
    setPrice(0);
    setQuantity(1);
    setvariation([]);
    props.closeModal();
  };

  return (
    <Modal
      show={show}
      onHide={closeModel}
      dialogClassName="modal-md xs"
      contentClassName="xs"
      centered
    >
      <Modal.Header>
        <h4 className="modal-title">Choose your option</h4>
        <button
          type="button"
          className="close"
          onClick={closeModel}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="res-price-box">
          <figure>
            <img src={thumb4} alt="" />
          </figure>
          <div className="cnts">
            <div className="head">
            
              <h3>{product.name}</h3>
            </div>
            <div className="dec">
              <p>{product.detail}</p>
            </div>
            <div className="price">
              From <span>$ {product.price}</span>
            </div>
            <div className="action">
            {product.weekday? <span className="btn hint">Only Available on Weekdays</span>:null}
            {product.weekend? <span className="btn hint">Only Available on Weekend</span>:null}
              
            </div>
          </div>
        </div>
        <div className="price-table-container">
          <h3>
            Choose from below : <span>( Select 1 )</span>
          </h3>
          <table className="table price-table">
            <tbody>{renderVariation()}</tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6 col-5">
              <div className="num-action">
                <span className="btn" onClick={() => changeQty(false)}>
                  -
                </span>
                <span className="value">{quantity}</span>
                <span onClick={() => changeQty(true)} className="btn">
                  +
                </span>
              </div>
            </div>
            <div className="col-lg-6 col-6">
              <button
                data-toggle="modal"
                data-target="#cartModal"
                className="btn primary"
                onClick={addTocarts}
              >
                <small>Add</small> ${" "}
                {quantity * (parseFloat(product.price) + price)}
              </button>
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

ChooseModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  showPickupModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  add_to_cart: state.products.add_to_cart,
  loading: state.products.loading,
});
export default withTranslation()(
  connect(mapStateToProps, { addTocart, cartLocal })(ChooseModal)
);
