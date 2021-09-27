import React,{useEffect} from 'react';
import Carousel1 from '../../components/Carousel/Carousel';
import Carousel from 'react-bootstrap/Carousel';
import image3 from '../../assets/svgs/image5.svg';
import './promo.css';
import image1 from "../../assets/svgs/image1.svg";
import image2 from "../../assets/svgs/image2.svg";
import image5 from "../../assets/svgs/image5.svg";
import axios from 'axios';
import PromoList from './promolist';
function Promo(){
  const authURL = process.env.REACT_APP_API_BASE_URL;
   var productNames=[];
   var productPromos=[];
   var productDescription=[];
   var length1;
  
   axios.get(authURL + "getProductPromo")
   .then(res => {
     length1=res.data.data.length;
     for(var i=0;i<res.data.data.length;i++){
      productNames.push(res.data.data[i].name)
      productPromos.push(res.data.data[i].promo);
      productDescription.push(res.data.data[i].promo_desc)
    }
    
   })
   .catch(err => console.log(err.response.data))
  
    return(
        <div>
  <PromoList lengthh={length1} name={productNames} promos={productPromos} description={productDescription}/>
</div>
    )
}

export default Promo;