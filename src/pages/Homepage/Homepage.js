import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./HomePage.css";
import "../../assets/css/modal.css";
import Carousel from "../../components/Carousel/Carousel";
import Pin from '../../pages/MobilePin/MobilePin';
import Button from 'react-bootstrap/Button';
//import image4 from "../../assets/svgs/image-4.svg";
import image6 from "../../assets/svgs/image-6.svg";
//import image7 from "../../assets/svgs/image-7.svg";
//import image8 from "../../assets/svgs/image-8.svg";
//import image9 from "../../assets/svgs/image-9.svg";

import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { getMenus } from "../../actions/productActions";
const URL = process.env.REACT_APP_API_BASE_IMG;
const HomePage = (props) => {
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
            className="col-lg-6 col-md-12 pl-md-2 pr-0 mt-2"
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

  return (
    <div>
    
    <div className=" main_sectionn ">
    
        <Carousel />
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
});
export default withTranslation()(
  connect(mapStateToProps, { getMenus })(HomePage)
);
