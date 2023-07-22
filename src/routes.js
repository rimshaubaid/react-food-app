
import AboutUs from "./pages/About-us/About-us.js";
import MenuItems from "./pages/MenuItems/MenuItems.js";
import Promo from './pages/Promo/promo';
import TrackOrder from "./pages/Track-order/Track-order";


const routes = {
  
  LoginHome: {
    component: MenuItems,
    path: "/home",
    exact: true,
    name: "Home",
  },

  aboutus: {
    component: AboutUs,
    path: "/about-us",
    exact: true,
    name: "About us",
  },

  promo:{
   component: Promo,
   path:"/promo",
   exact:true,
   name:"Promo"
  }

};

export default routes;
