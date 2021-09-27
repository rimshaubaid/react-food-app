import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image3 from '../../assets/svgs/image5.svg';
import './promo.css';
import image1 from "../../assets/svgs/image1.svg";
import image2 from "../../assets/svgs/image2.svg";
import image5 from "../../assets/svgs/image5.svg";
function PromoList(props){
    var lengthArr=props.lengthh;
    console.log(props)
    return(
    <div>
{Array.from({length:3}).map((_, index) => (
    <div key={index}> 
       <Carousel>
      <Carousel.Item >
        
        <img className="d-block w-100" src={image1} alt="First slide" />
        <Carousel.Caption style={{top:"40%",bottom:"auto"}}>
          <h5>{props.name[index]}</h5>
          <span>{props.description[index]}</span>
        </Carousel.Caption>
        <Carousel.Caption style={{background:"transparent",position:"absolute",right:"0"}}>
          <button  type="submit" className="btn primary lg">
                     Add to Cart
                    </button>

        </Carousel.Caption>
        <Carousel.Caption style={{right:"0",top:"5%",bottom:"auto"}}>
          <h5>25% off on Breakfast</h5>
          
        </Carousel.Caption>
       
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image2} alt="Second slide" />
<Carousel.Caption style={{top:"40%",bottom:"auto"}}>
          <h5>{props.name[index]}</h5>
          <span>{props.description[index]}</span>
        </Carousel.Caption>
        <Carousel.Caption style={{background:"transparent",position:"absolute",right:"0"}}>
          <button  type="submit" className="btn primary lg">
                     Add to Cart
                    </button>

        </Carousel.Caption>
        <Carousel.Caption style={{right:"0",top:"5%",bottom:"auto"}}>
          <h5>25% off on Breakfast</h5>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image5} alt="Third slide" />
<Carousel.Caption style={{top:"40%",bottom:"auto"}}>
          <h5>{props.name[index]}</h5>
          <span>{props.description[index]}</span>
        </Carousel.Caption>
       <Carousel.Caption style={{background:"transparent",position:"absolute",right:"0"}}>
          <button  type="submit" className="btn primary lg">
                     Add to Cart
                    </button>

        </Carousel.Caption>
        <Carousel.Caption style={{right:"0",top:"5%",bottom:"auto"}}>
          <h5>25% off on Breakfast</h5>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <br />
    </div>
      ))}
      </div>
      )

}

export default PromoList;