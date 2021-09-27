import React, { useState } from "react";
import "./Tabs.css";
import "../../assets/css/component.css";
import "../../assets/css/modal.css";
import { ButtonGroup, Dropdown } from "react-bootstrap";

import DeliveryModal from "../DeliveryModal/DeliveryModal";
import DeliveryTime from "../DeliveryModal/DeliveryTime";
import OrderPlaced from "../OrderPlaced/OrderPlaced";
import { scroller } from "react-scroll";

const Tabs = (props) => {
  const [showDelivery, setShowDelivery] = useState(false);
  const [showDeliveryTime, setShowDeliveryTime] = useState(false);
  const [showOrderPlaced, setShowOrderPlaced] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [scrollTo, setScrollTo] = useState(1);



 

  const scrollToElement = (id, index) => {
   
    scroller.scrollTo("con-" + id ,{
      duration: 500,
      delay: 100,
      smooth: true,
     // Scrolls to element + 50 pixels down the page
      offset:-200,
    });
    setScrollTo((scrollTo) => scrollTo + 1);
    setActiveItem(index);
    
   
  };
  
  const renderCat = () => {
    let html = [];

    let html2 = [];

    if (props.category && Object.keys(props.category.data).length > 0) {
      Object.keys(props.category.data).map((key, index) => {
      
        if (index < 4) {
          
          html.push(
            <li key={index} className="nav-item">
          
              <button 
                className={ 
                 activeItem === index ? "nav-link active" : "nav-link"
                } 
                id="pills-2-tab"
                data-toggle="pill"
                role="tab"
                aria-selected="false"
                onClick={(e) => {
                  scrollToElement(props.category.data[key].id, index)
                  
                }}
              >
                {" "}
                {props.category.data[key].name}{" "}
                
              </button>
            </li>
          );
          
        } else {
          html2.push(
            <Dropdown.Item
              eventKey={key}
              onClick={(e) =>
                scrollToElement(props.category.data[key].id, index)
              }
              className="border-bottom"
            >
              {props.category.data[key].name}
            </Dropdown.Item>
          );
        }
      });
    }
    //setCategoryMenu(html2);
    return html;
  };
  const renderCat2 = () => {
    let html2 = [];

    if (props.category && Object.keys(props.category.data).length > 0) {
      Object.keys(props.category.data).map((key, index) => {

        if (index > 4) {
          html2.push(
            <Dropdown.Item
              key={index}
              eventKey={key}
              onClick={(e) =>
                scrollToElement(props.category.data[key].id, index)
              }
              className="border-bottom"
             
            >
              {props.category.data[key].name}
            </Dropdown.Item>
          );
        }
      });
    }
    //setCategoryMenu(html2);
    return html2;
  };
  const renderCatMobile= () => {
    let html2 = [];

    if (props.category && Object.keys(props.category.data).length > 0) {
      Object.keys(props.category.data).map((key, index) => {
     
          html2.push(
            <Dropdown.Item
              key={index}
              eventKey={key}
              onClick={(e) =>
                scrollToElement(props.category.data[key].id, index)
              }
              className="border-bottom"
            >
              {props.category.data[key].name}
            </Dropdown.Item>
          );
        
      });
    }
    //setCategoryMenu(html2);
    return html2;
  };
  return (
    <span>
      <div className="tab-ember primary">
        <DeliveryModal
          show={showDelivery}
          closeModal={() => setShowDelivery(false)}
        />
        <DeliveryTime
          show={showDeliveryTime}
          closeModal={() => setShowDeliveryTime(false)}
        />
        <OrderPlaced
          show={showOrderPlaced}
          closeModal={() => setShowOrderPlaced(false)}
        />
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
          {renderCat()}
           
          <li className="nav-item dropdown">
            <Dropdown  as={ButtonGroup}>
              <Dropdown.Toggle
              variant="light"
                id="dropdown-custom-1"
                className="more-dropdown border-0"
              >
                More
              </Dropdown.Toggle>
              <Dropdown.Menu className="category-menu">
                {renderCat2()}
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
      <div className="tab-ember primary mobile">
        <div>
         
        </div>
        <div style={{marginBottom:"1%"}} className="drop-group">
          <Dropdown as={ButtonGroup} drop="down">
            <Dropdown.Toggle
              id="dropdown-custom-1"
              className="more-dropdown border-0"
            >
              See all
            </Dropdown.Toggle>
            <Dropdown.Menu className="category-menu">
              {renderCatMobile()}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
     
    </span>
  );
};

export default Tabs;
