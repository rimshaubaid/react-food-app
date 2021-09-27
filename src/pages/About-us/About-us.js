import React from "react";
import "./About-us.css";
import "../../assets/css/modal.css";
import aboutUs from "../../assets/svgs/about-us.svg";
import Carousel from "../../components/Carousel/Carousel";

const AboutUs = () => {
  return (
    <div className="main_section">
      <div className="outlet_div">
        <img src={aboutUs} className="w100" alt="" />
        <div className="img-text">About Us</div>
      </div>
      <div className="row" style={{ margin: "auto" }}>
        <div className="col-12 col-md-9 p-5 mb-3">
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

      {/* About Us List content */}
      <div className=" row m-auto list-container mb-5">
        <div className="col-12 col-md-6 px-0">
          <div className="image-div"></div>
        </div>
        <div className="bg-white col-12 col-md-6 d-flex flex-column justify-content-center p-5 my-5">
          <div className="about-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor rhoncus dolor purus non enim praesent elementum facilisis
            leo, vel
          </div>
        </div>
      </div>

      <div className=" row m-auto list-container mb-5">
        <div className="bg-white col-12 col-md-6 d-flex flex-column justify-content-center p-5 my-5">
          <div className="about-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor rhoncus dolor purus non enim praesent elementum facilisis
            leo, vel
          </div>
        </div>
        <div className="col-12 col-md-6 px-0">
          <div className="image-div2"></div>
        </div>
      </div>

      {/* Gallery */}

      <div className="gallery">Gallery</div>
      <div className="mt-4">
        <Carousel hideContent={true} />
      </div>
    </div>
  );
};

export default AboutUs;
