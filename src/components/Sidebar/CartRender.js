import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import {
  clearCartSingle,
  cartUpdate,
  cartLocal,
} from "../../actions/productActions";

class CartRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cdata: props.cdata,
    };

    this.cartChange = this.cartChange.bind(this);
    this.cartRender = this.cartRender.bind(this);
    this.clearCartSingle = this.clearCartSingle.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextprops) {
    // let dataprops = nextprops;
    //console.log(dataprops);
  
    if (
      nextprops.loading === false &&
      nextprops.add_to_cart !== null &&
      Object.keys(nextprops.add_to_cart.data).length === 0
    ) {
      this.props.updateCart(null);
    }

    if (
      nextprops.loading === false &&
      nextprops.add_to_cart !== null &&
      nextprops.add_to_cart.success &&
      Object.keys(nextprops.add_to_cart.data).length > 0
    ) {
      this.setState({ cdata: nextprops.add_to_cart.data.cart });
    }
  }

  cartChange = (state, key, stock, id) => {
    let oldData = this.state.cdata;
    // console.log(stock);
    if (state) {
     // if (oldData[key].quantity >= stock) {
      //  return;
     // } else {
        let newQty = parseInt(oldData[key].quantity) + 1;
        oldData[key].quantity = newQty;
     // }
    } else {
      if (oldData[key].quantity > 1) {
        let newQty = parseInt(oldData[key].quantity) - 1;
        oldData[key].quantity = newQty;
      }
    }
    if (localStorage.login) {
      this.props.cartUpdate(id, oldData[key]);
    } else {
      localStorage.setItem("cart", JSON.stringify(oldData));
      this.props.cartLocal(oldData);
    }

    // this.setState({ cdata: oldData });
  };

  clearCartSingle = (id) => {
    let oldData = this.state.cdata;
    if (localStorage.login) {
      this.props.clearCartSingle(id);
    } else {
      if (oldData.length > 0) {
        oldData.splice(id, 1);

        this.props.cartLocal(oldData);

        localStorage.setItem('cart', JSON.stringify(oldData));
      }

      //  this.props.cartLocal(oldData);
    }
  };

  cartRender = () => {
    
    let html = [];
    let cdata = this.state.cdata;
    if (cdata && Object.keys(cdata).length > 0) {
      console.log(cdata)
      Object.keys(cdata).map((key, index) =>
        html.push(
          <div key={key} className="groups">
            <div className="group">
              <div className="left">{cdata[key].product_name}</div>
              <span
                onClick={() => this.clearCartSingle(cdata[key].id)}
                className="right"
              >
                <i className="delete-icon"></i>
              </span>
            </div>
            <div className="group">
              <div className="left">
                <div className="num-action md">
                  <span
                    className="btn"
                    onClick={(e) =>
                      this.cartChange(
                        false,
                        key,
                        cdata[key].product[0].stock,
                        cdata[key].id
                      )
                    }
                  >
                    -
                  </span>
                  <span className="value"> {cdata[key].quantity}</span>
                  <span
                    className="btn"
                    onClick={(e) =>
                      this.cartChange(
                        true,
                        key,
                        cdata[key].product[0].stock,
                        cdata[key].id
                      )
                    }
                  >
                    +
                  </span>
                </div>
              </div>
              <div className="right">{cdata[key].price}</div>
            </div>
          </div>
        )
      );
    }
    //  console.log(menus);
    return html;
  };

  render() {
    // let cartRender = this.cartRender();
    return <>{this.cartRender()}</>;
  }
}

const mapStateToProps = (state) => ({
  add_to_cart: state.products.add_to_cart,
  loading: state.products.loading,
});
export default withTranslation()(
  connect(mapStateToProps, { clearCartSingle, cartUpdate, cartLocal })(
    CartRender
  )
);
