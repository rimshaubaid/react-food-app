import React from 'react';
import aboutUs from "../../assets/svgs/about-us.svg";
function OutletDescription(props){
    var lengthArr=props.lengthh;
    
    return(
        <div>
{Array.from({length:lengthArr}).map((_, index) => (
        <div key={index}>
          <div className="outlet_div">
            <img src={aboutUs} className="w100" alt="" />
            <div className="img-text">{props.name[index]}</div>
          </div>
          <div className="row" style={{ margin: "auto" }}>
            <div className="col-12 col-md-9 p-5">
              <div className="about-content">
                A local Chinese eatery that had been wok-king out fiery dishes
                for 3 generation. Started out from a small hawker stall in 1970s
                at Old Havelock Road and currently operating at Alexandra
                Village.
              </div>
              <div className="about-content mt-3">
                A few of our top recommended dishes from our Menu is the Chilli
                & Black Pepper Crabs, Handmade Hei-Chor (Prawn Rolls), uniquely
                created Mingzhu Rolls, Wok-toss Moonlight Horfun and Coffee Pork
                Ribs.
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    )
}

export default OutletDescription;