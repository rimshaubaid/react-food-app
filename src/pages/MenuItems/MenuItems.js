import React, { useState, useEffect ,useRef} from "react";
import "./LoginHome.css";
import "../../assets/css/bundle.css";
import { useHistory } from "react-router-dom";
import "../../assets/css/modal.css";
import Carousel from "../../components/Carousel/Carousel";
import Tabs from "../../components/HomeTabs/Tabs.js";
import OrderItem from "../../components/OrderItem/orderItem.js";
import ChooseModal from "../../components/OrderItem/chooseModal";
import Pickup from "../../components/Pickup/Pickup";
import PickupDate from "../../components/PickupDate/PickupDate";
import TrackOrder from "../../components/TrackOrder/TrackOrder";
import TrackOrderNow from "../../components/TrackOrderNow/TrackOrderNow";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { getMenubyId, getCategories } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import PopUp from "../../components/Modals/Popup";
import useIntersection from './useIntersection';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'



const MenuItems = (props) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [productDataModal, setProductDataModal] = useState("");
  const [showPickup, setShowPickup] = useState(false);
  const [showPickupDate, setShowPickupDate] = useState(false);
  const [showtrackOrder, setShowTrackOrder] = useState(false);
  const [showTrackNow, setShowTracknow] = useState(false);
  const [load, setLoad] = useState(false);
  const [catload, setCatLoad] = useState(false);
  const { id } = useParams();
  const [menus, setMenus] = useState(null);
  const [caetgory, setCaetgory] = useState(null);
  const [menuload, setMenuload] = useState(false);

  const [order, setOrder] = useState([]);

  const [lshow, setLshow] = useState(false);
  const [popupText, setPopupText] = useState("");
   



 
  
  useEffect(() => {
    if (!load) {
      props.getMenubyId(id);
      props.getCategories();
      setLoad(true);
    }

    if (
      props.loading === false &&
      props.menus_by_id !== null &&
      menuload === false
    ) {
      setMenus(props.menus_by_id);
      setMenuload(true);
    }

    if (
      props.loading === false &&
      props.category !== null &&
      catload === false
    ) {
      setCaetgory(props.category);
      setCatLoad(true);

    }
  }, [load, id, props, order, menuload, catload]);

  const showPickFunction = () => {
    // console.log("____Show pick up function_______");
    setShowModal(false);
    setShowPickup(true);
  };

  const pickupDateFunction = () => {
    setShowPickupDate(true);
    setShowPickup(false);
  };

  const trackOrderFunction = () => {
    //console.log("____Show trackOrderFunction_______");
    setShowPickupDate(false);
    setShowTrackOrder(true);
  };

  const showTrackOrderNowFunction = () => {
    setShowTrackOrder(false);
    setShowTracknow(true);
  };

  const trackOrderPage = () => {
    setShowTracknow(true);
    history.push("/track-order");
  };

  const ProductModel = (data) => {
    setShowModal(true);
    setProductDataModal(data);
  };

  const ProductsRender = () => {
    
    //console.log("____product reducer______");
    let html = [];
    //console.log(menus);

    if (menus && Object.keys(menus.data).length > 0) {
      let data = menus.data;

      Object.keys(data).forEach(function (key) {
        //console.log(data[key]);
        let product_num = data[key].get_products.length;
      
  
       
       
        html.push(
          product_num >0 &&
          <div  id="menus" key={key} className="ord-gutter" name={'con-'+data[key].id}>
      
          
            <div className="heading">
      
              <h3 >
                 
                {data[key].name}<span >{product_num} items</span>
              
                
              </h3>
            </div>
           
              <OrderItem 
                data={data[key]}
                showChooseModal={ProductModel}
              />

          </div>
          
        );
      });
    }
   
    //  console.log(menus);

    return html;
  };
  
  return (
    <div className="main-section">
      <PopUp
        text={"Added to cart successfully!"}
        show={lshow}
        closeModal={() => setLshow(false)}
      />
      <Carousel />

      <ChooseModal
        setOrder={setOrder}
        setLshow={() => setLshow(true)}
        order={order}
        show={showModal}
        product={productDataModal}
        updateCart={props.updateCart}
        closeModal={() => setShowModal(false)}
        showPickupModal={() => showPickFunction()}
      />
      <Pickup
        setOrder={setOrder}
        order={order}
        show={showPickup}
        closeModal={() => setShowPickup(false)}
        showPickupDate={() => pickupDateFunction()}
      />

      <PickupDate
        setOrder={setOrder}
        order={order}
        show={showPickupDate}
        closeModal={() => setShowPickupDate(false)}
        showTrackOrder={() => trackOrderFunction()}
      />

      <TrackOrder
        show={showtrackOrder}
        closeModal={() => setShowTrackOrder(false)}
        trackOrderNow={() => showTrackOrderNowFunction()}
      />

      <TrackOrderNow
        show={showTrackNow}
        closeModal={() => setShowTracknow(false)}
        trackOrder={() => trackOrderPage()}
      />
      {/* trackOrderNow={() => showTrackOrderNowFunction()} */}

      <div className="tab-gutter">
        {/* ul */}
       
<Tabs  category={caetgory} />
        <div  className="tab-content" id="pills-tabContent">
          <div 
            className="tab-pane fade show active"
            id="pills-1"
            role="tabpanel"
            aria-labelledby="pills-1-tab"
          >
          
            {ProductsRender()}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  menus_by_id: state.products.get_menus_by_id,
  category: state.products.category,
  loading: state.products.loading,
});
export default withTranslation()(
  connect(mapStateToProps, { getMenubyId, getCategories })(MenuItems)
);
