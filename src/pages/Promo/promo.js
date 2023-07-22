import React,{useEffect,useState} from 'react';
import Carousel1 from '../../components/Carousel/Carousel';
import Carousel from 'react-bootstrap/Carousel';
import image3 from '../../assets/svgs/image5.svg';
import './promo.css';
import image1 from "../../assets/svgs/image1.svg";
import image2 from "../../assets/svgs/image2.svg";
import image5 from "../../assets/svgs/image5.svg";
import axios from 'axios';

import { addTocart, cartLocal } from "../../actions/productActions";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";


import PropTypes from "prop-types";

const URL = process.env.REACT_APP_API_BASE_IMG;

const authURL = process.env.REACT_APP_API_BASE_URL;

   var length1;
   
   var productId=[];
   var dataa;
  axios.get(authURL + "getProductPromo")
   .then(res => {
     console.log('promo products',res.data);
     dataa=res.data.data
     length1=res.data.data.length;
     
    console.log('promo data',dataa)

   })
   .catch(err => console.log(err.response.data))

function Promo(props){
  const [price, setPrice] = useState(0);
  const [variation, setvariation] = useState([]);
  const [loded, setLoded] = useState(false);
  const [addCart, setaddCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
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
      //props.setOrder(data);
      // props.showPickupModal();
      setLoded(false);
      //props.setLshow(true);

      
     
    }
  }, [addCart, loded, props]);


  const renderProduct = () => {
    
    let html = [];

    if (
      productId &&
      length1 > 0
    ) {
      let data =dataa;

      Object.keys(data).forEach(function (key) {
        html.push(
         
       
         <div 
            
            key={key}
            className="col-lg-6 col-md-12 pl-md-2 pr-0 mt-2"
          >
            <div className="outlet_div">
            
              <img 
                className="w100"
                src={
                      data &&
                      
                      URL  + data[key].path
                    }
                alt="product"
              />
              
             
              <div className="slider_text">
                <h5>{data && data[key].name}</h5>
                <span>{data && data[key].promo_desc}</span>
                <br />
                <br />
                 <button  onClick={() => addTocarts(key)} type="submit" className="btn primary lg">
                     Add $  {data && data[key].price}
                    </button>
              </div>
              
            </div>
          </div>
        );
      });
    }
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

const addTocarts = (key) => {
  console.log('in add to carts',dataa)
  console.log(dataa[key].id)
    let data = {
      product_id: dataa[key].id,
      quantity: 1,
      price: dataa[key].price,
      vari_price:0,
      variation_id:null,
    };
    if (localStorage.login) {
      setLoded(true);
     
      props.addTocart(data);
    } else {
      setLoded(true);
      addCartLocal(data);
      
      
    }
    //  props.showPickupModal();
  };

  
  
  
    return(
        <div className="row outlet_row ">
       
 {renderProduct()}
</div>
    )
}





const mapStateToProps = (state) => ({
  add_to_cart: state.products.add_to_cart,
  loading: state.products.loading,
});
export default withTranslation()(
  connect(mapStateToProps, { addTocart, cartLocal })(Promo)
);