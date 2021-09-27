import React, { useState } from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import "./Sidebar.css";
import "../../assets/css/modal.css";
import logo from "../../assets/svgs/logo.svg";
import icon1 from "../../assets/svgs/icon-1.svg";
import icon1active from "../../assets/svgs/icon-1-active.svg";
import icon2 from "../../assets/svgs/icon-2.svg";
import icon2active from "../../assets/svgs/icon-2-active.svg";
import icon3 from "../../assets/svgs/icon-3.svg";
import icon3active from "../../assets/svgs/icon-3-active.svg";
import icon4 from "../../assets/svgs/icon-4.svg";
import icon4active from "../../assets/svgs/icon-4-active.svg";
import more from "../../assets/svgs/more.svg";
import moreactive from "../../assets/svgs/more-active.svg";
import contact1 from "../../assets/svgs/contact-1.svg";
import contact2 from "../../assets/svgs/contact-2.svg";
import contact3 from "../../assets/svgs/contact-3.svg";
import { useHistory } from "react-router-dom";
import MenuModal from "../Menu/MenuModal";
import { useRouteMatch } from "react-router-dom";
const Sidebar = ({ showMobile }) => {
  const [showMenu, setShowMenu] = useState(false);
  let { path, url } = useRouteMatch();
  const history = useHistory();
  var myurl = url.split("/");
 


  const showDialog = (event) => {
    event.preventDefault();
  //  if(localStorage.login){
    //  setShowMenu(true);
   // }else{
      history.push('/menus/1');
   // }
 
  };



  return (
    <div className="side-menu">
      <MenuModal show={showMenu} closeModal={() => setShowMenu(false)} />
      {/* <ul>
        <li>
          <a href="/" className="logo">
            {" "}
            <img src={logo} alt="" />
          </a>
        </li>
        <li className="menu_li">
          <a href="/outlets">
            <div>
              {props.path === "/outlets" ? (
                <img src={icon1active} className="active_img d-block" alt="" />
              ) : (
                <img src={icon1} className="non_active_img" alt="" />
              )}
              <p className={props.path === "/outlets" ? "active-content" : ""}>
                Outlets
              </p>
            </div>
          </a>
        </li>
        <li className="menu_li">
          <a href="/about-us">
            <div>
              {props.path === "/about-us" ? (
                <img src={icon2active} className="active_img d-block" alt="" />
              ) : (
                <img src={icon2} className="non_active_img" alt="" />
              )}
              <p className={props.path === "/about-us" ? "active-content" : ""}>
                About us
              </p>
            </div>
          </a>
        </li>
        <li className="menu_li">
          <a href={null} onClick={(event) => showDialog(event)}>
            <div>
              <img src={icon3} className="non_active_img" alt="" />
              <img
                src="images/icon-3-active.svg"
                className="active_img"
                alt=""
              />
              <p>Menu</p>
            </div>
          </a>
        </li>
        <li className="menu_li">
          <a href={null}>
            <div>
              <img src={icon4} className="non_active_img" alt="" />
              <img
                src="images/icon-4-active.svg"
                className="active_img"
                alt=""
              />
              <p>Promo</p>
            </div>
          </a>
        </li>
        <li className="contact_li">
          <span>Connect with us!</span>
          <div className="align-content-center d-flex justify-content-center mb-3 mt-3">
            <a href={null} className="px-2">
              <img src={contact1} alt="" />
            </a>
            <a href={null} className="px-2">
              {" "}
              <img src={contact2} alt="" />
            </a>
            <a href={null} className="px-2">
              <img src={contact3} alt="" />
            </a>
          </div>
          <span>Powered by Warely</span>
        </li>
      </ul> */}

      <ul className="menu">
        <li className="menu-logo">
          <Link to={"/"} className="logo">
            {" "}
            <img src={logo} alt="" />
          </Link>
        </li>
        <li className="menu-li">
          <Link to={"/outlets"}>
            <div>
              {path === "/outlets" ? (
                <>
                <img src={icon1active} className="active-img" alt="" />
                <p className="active">Outlets</p>
                </>
              ) : (
                <>
                <img src={icon1} className="non-active-img" alt="" />
                <p >Outlets</p>
                </>
              )}
          
            </div>
          </Link>
        </li>
        <li className="menu-li ">
          <Link to={"/about-us"}>
            <div>
              {path === "/about-us" ? (
                <>
                <img src={icon2active} className="active-img" alt="" />
                <p className="active">About us</p>
                </>
              ) : (
                <>
                <img src={icon2} className="non-active-img" alt="" />
                <p >About us</p>
                </>
              )}
          
            </div>
          </Link>
        </li>
        <li className="menu-li">
          <Link to="/menus/4" >
            <div>
        
              {myurl[1] === "menus" ? (
                <>
                <img src={icon3active} className="active-img" alt="" />
                <p className="active">Menu</p>
                </>
              ) : (
                <>
                <img src={icon3} className="non-active-img" alt="" />
                <p>Menu</p>
                </>
              )}
        
            </div>
          </Link>
        </li>
        <li className="menu-li">
          <Link to={"/promo"}>
            <div>
              {url === "/promo" ? (
                <>
                <img src={icon4active} className="active-img" alt="" />
                <p className="active">Promo</p>
                </>
              ) : (
                <>
                <img src={icon4} className="non-active-img" alt="" />
                <p>Promo</p>
                </>
              )}
           
            </div>
          </Link>
        </li>
        <li className="menu-li menu-toggle">
          <a href={null} onClick={showMobile}>
            <div>
              {url === "/more" ? (
                <>
                <img src={moreactive} className="active-img" alt="" />
                <p className="active">More</p>
                </>
              ) : (
                <>
                <img src={more} className="non-active-img" alt="" />
                <p >More</p>
                </>
              )}
           
            </div>
          </a>
        </li>
        <li className="contact-li">
   
          <Link style={{marginBottom:"3px"}} to={'/track-order'} className="title d-none d-sm-block d-sm-none d-md-block d-md-none d-lg-block d-lg-none d-xl-block">Track Your Order</Link>
          <div style={{marginTop:"7px"}}>
          <span className="title">Connect with us!</span>
         </div>
          <div className="mt-3 mb-3">
            <a href="#" className="mr-3">
              <img src={contact1} alt="" />
            </a>
            <a href="#">
              {" "}
              <img src={contact2} alt="" />
            </a>
            <a href="#" className="ml-3">
              <img src={contact3} alt="" />
            </a>
          </div>
          <span className="powered">Powered by Warely</span>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  showMobile: PropTypes.func.isRequired,
};

export default Sidebar;
