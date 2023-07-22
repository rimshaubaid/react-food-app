import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./HomePage.css";
import "../../assets/css/modal.css";
import Carousel from 'react-bootstrap/Carousel';
import Pin from '../../pages/MobilePin/MobilePin';
import Button from 'react-bootstrap/Button';
//import image4 from "../../assets/svgs/image-4.svg";
import image6 from "../../assets/svgs/image-6.svg";
//import image7 from "../../assets/svgs/image-7.svg";
//import image8 from "../../assets/svgs/image-8.svg";
//import image9 from "../../assets/svgs/image-9.svg";
import { addTocart, cartLocal } from "../../actions/productActions";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import axios from 'axios';
import { getMenus } from "../../actions/productActions";
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
const HomePage = (props) => {
  const [loded, setLoded] = useState(false);
  const [addCart, setaddCart] = useState(false);
  const [load, setLoad] = useState(false);
const [isPin,setPin]=useState(true);
  const [menus, setMenus] = useState(null);
  const history = useHistory();
  useEffect(() => {
    //localStorage.login && setLogin(true);
    if (!load) {
      setLoad(true);
      props.getMenus();
    }

    if (props.menus !== null) {
      setMenus(props.menus);
    }
  }, [load, props]);

  const MenusDetails = (key) => {
    history.push("/menus/" + key);
  };

  const MenusRender = () => {
    let html = [];

    if (menus && Object.keys(menus.data).length > 0) {
      let data = menus.data;

      Object.keys(data).forEach(function (key) {
        html.push(
          <div 
            onClick={() => MenusDetails(data[key].id)}
            key={key}
            className="col-lg-6 col-md-12 pl-md-2 pr-0 mt-2 btn"
          >
            <div className="outlet_div">
              <img 
                className="w100"
                src={
                  data &&
                  data[key].get_image &&
                  URL +  data[key].get_image.path
                }
                alt="product"
              />

              <div className="slider_text">
                <h5>{data[key].name && data[key].name}</h5>
                <span>From March 1 to April 1</span>
              </div>
            </div>
          </div>
        );
      });
    }
    //  console.log(menus);

    return html;
  };
const renderProduct = () => {
    
    let html = [];

    if (
      productId &&
      length1 > 0
    ) {
      let data =dataa;
<Carousel>
      <Carousel.Item >
        
        <img className="d-block w-100" src={
                     image6
                    } alt="First slide" />
        <Carousel.Caption style={{top:"40%",bottom:"auto"}}>
          <h5>hi</h5>
         
          <span>hi</span>

          
        </Carousel.Caption>
        <Carousel.Caption style={{background:"transparent",position:"absolute",right:"0"}}>
      
          

        </Carousel.Caption>
        <Carousel.Caption style={{right:"0",top:"5%",bottom:"auto"}}>
          <h5>25% off on Breakfast</h5>
          
        </Carousel.Caption>
       
      </Carousel.Item>
      
      
    </Carousel>
      
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
  return (
    <div>
    
    <div className=" main_sectionn ">
    {renderProduct()}
       
       <div className="row outlet_row ">{MenusRender()}</div>
    </div>
    <div  style={{marginBottom:'3%'}} className="col-md-12 col-sm-12 mt-4 d-sm-none">

   <Pin />
   </div>
   
    
    </div>
  );
};

const mapStateToProps = (state) => ({
  menus: state.products.get_menus,
  add_to_cart: state.products.add_to_cart,
  loading: state.products.loading,
});
export default withTranslation()(
  connect(mapStateToProps, { addTocart, cartLocal,getMenus })(HomePage)
);


