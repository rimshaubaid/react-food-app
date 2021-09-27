import React from "react";

import Carousel from "react-bootstrap/Carousel";
import image1 from "../../assets/svgs/image1.svg";
import image2 from "../../assets/svgs/image2.svg";
import image5 from "../../assets/svgs/image5.svg";

const Carousels = (props) => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={image1} alt="First slide" />
        <Carousel.Caption>
          <h5>1 for 1 sashimi</h5>
          <span>From March 1 to April 1</span>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image2} alt="Second slide" />

        <Carousel.Caption>
          <h5>1 for 1 sashimi</h5>
          <span>From March 1 to April 1</span>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image5} alt="Third slide" />

        <Carousel.Caption>
          <h5>1 for 1 sashimi</h5>
          <span>From March 1 to April 2</span>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Carousels;
