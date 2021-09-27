import React,{useEffect}from "react";
import "./Outlets.css";
import "../../assets/css/modal.css";
import map from "../../assets/svgs/map.svg";
import OutletDescription from './OutletDescription';
import axios from 'axios';
import OutletsMap from './OutletsMap';

const authURL = process.env.REACT_APP_API_BASE_URL;

var names=[];
var length1;
var latPoints=[];
var lngPoints=[];
  axios.get(authURL + 'outlets')
  .then(res => {
    length1=res.data.data.length;
    console.log(res.data);
    for(var i=0;i<res.data.data.length;i++){
      names.push(res.data.data[i].name)
    }
  })
  .catch(err => console.log(err))

const Outlets = () => {
  

  
  return (
    <div className="main_section">
      <div className="map">
        
        <OutletsMap />
      </div>
      <div className="row" style={{ margin: "auto" }}>
        <div className="col-12 col-md-9 p-5">
          <div className="about-content">
            A local Chinese eatery that had been wok-king out fiery dishes for 3
            generation. Started out from a small hawker stall in 1970s at Old
            Havelock Road and currently operating at Alexandra Village.
          </div>
          <div className="about-content mt-3">
            A few of our top recommended dishes from our Menu is the Chilli &
            Black Pepper Crabs, Handmade Hei-Chor (Prawn Rolls), uniquely
            created Mingzhu Rolls, Wok-toss Moonlight Horfun and Coffee Pork
            Ribs.
          </div>
        </div>
      </div>
      <OutletDescription lengthh={length1} name={names}/>
    </div>
  );
};

export default Outlets;
