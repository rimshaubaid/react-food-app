import React from "react";
import "./orderItem.css";
import "./button.css";

import PropTypes from "prop-types";

const URL = process.env.REACT_APP_API_BASE_IMG;
const OrderItem = (props) => {
  


  const renderProduct = () => {
    let html = [];

    if (
      props.data.get_products &&
      Object.keys(props.data.get_products).length > 0
    ) {
      let data = props.data.get_products;

      Object.keys(data).forEach(function (key) {
        html.push(
          
          <div   key={key} className="col-xl-6 ">
            <div  className="box">
              <div className="row">
                <div style={{width:"345px",height:"218px",padding:"0px 15px"}} className="col-6">
                  <img 
                    style={{objectFit:"fill"}}
                    className="item-img"
                    src={
                      data &&
                      data[key].get_image &&
                      URL  + data[key].get_image.path
                    }
                    alt="product"
                  />
                </div>
                <div  className="col-6 cnts">
                  <div className="head">
                    <h3>{data && data[key].name}</h3>
                    {/* <h4>Online Exclusive</h4> */}
                  </div>
                  <div className="dec">
                    <p>{data && data[key].detail}</p>
                  </div>
                  <div className="action">
                    <div className="price">
                      From <span>$ {data && data[key].price}</span>
                    </div>
                    <button
                      onClick={() => {
                        props.showChooseModal(data && data[key]);
                      }}
                      data-toggle="modal"
                      data-target="#cartModal"
                      className="btn primary btn-item"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    return html;
  };

  return <div className="row">{renderProduct()}</div>;
};

OrderItem.propTypes = {
  showChooseModal: PropTypes.func.isRequired,
};

export default OrderItem;
