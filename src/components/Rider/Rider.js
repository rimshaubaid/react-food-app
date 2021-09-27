import React,{useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import close from "../../assets/svgs/close.svg";
import './Rider.css';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
function Rider(props){
     const authURL = process.env.REACT_APP_API_BASE_URL;
const history=useHistory();
  const [link,setLink]=React.useState(null);
  const [driver,setDriver]=React.useState(null);
  const [driverName,setDriverName]=React.useState(null);
  const [driverPhone,setDriverPhone]=React.useState(null);
  const [driverPlate,setDriverPlate]=React.useState(null);

  useEffect(() => {
if(props.orderNum){
  axios.get( authURL + "orderDetails", {params:{id:props.orderNum}})
    .then(res => {
       setDriver(res.data.data.driverId)
       setLink(res.data.data.shareLink)}) 
    .catch(err => {
      let error;
      if(err.response && err.response.data){
        error=err.response.data;
      } else {
        error=null;
      }

      console.log(error)
    })
   }

   if(driver){
  axios.get(authURL +"driversDetails", {params:{orderid:props.orderNum,driverid:driver}})
    .then(res => {
      setDriverName(res.data.data[0].name);
      setDriverPhone(res.data.data[0].phone);
      setDriverPlate(res.data.data[0].plateNumber);
    })
    .catch(err => {
      let error;
      if(err.response && err.response.data){
        error=err.response.data;
      } else {
        error = null;
      }
      console.log(error);
    })
}
  },[props.orderNum,driver,authURL])
  

  function emptyCart(){
    props.onHide();
    axios.delete(authURL+ "cart/clear")
    .then(res => console.log(res.data))
    .catch(err => console.log(err.response))
    localStorage.removeItem("cart");
    localStorage.removeItem("cart_data");
    history.push("/");
    window.location.reload();
    
  }
    return(
<Modal
      show={props.show}
      onHide={props.onHide}
      className="rounded-lg"
      dialogClassName="modal-smd"
      centered
    >
      <Modal.Header className="alpha">
        <button
          type="button"
          className="close-modal-btn mr-3 close-z"
          data-dismiss="modal"
          aria-label="Close"
          onClick={emptyCart}
        >
          <img src={close} width="20" alt="close" />
        </button>
      </Modal.Header>
      <Modal.Body >
     
       {driverName? <div>
      <div style={{textAlign:"center"}}>
      <h2 style={{paddingTop:"5%",color:"#696969",fontWeight:"300",paddingBottom:"2%"}}>DRIVER DETAILS</h2>
      </div>
      <div style={{textAlign:"center",borderRadius: '7px',border: '1px solid #696969',paddingTop:"15%",paddingBottom:"30%"}} >
      
          <h5>Driver Name : &nbsp; &nbsp; {driverName}</h5> 
          <br />
          <h5>Driver Phone : &nbsp; &nbsp; {driverPhone}</h5>
          <br />
          <h5>Driver Plate Number : &nbsp; &nbsp; {driverPlate}</h5>
          <br />
           <a href={link}>Track your rider here</a>
            
        </div>
       </div>:<div><div  className="image">
           
            <img style={{marginLeft:"8%",marginTop:"0%"}} src="data:image/jpeg;base64,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" alt="user" />
           
           <div style={{marginTop:"3%",marginLeft:"18%",display:"block",textAlign:"center"}} class="spin spinner"></div>
        
       </div>
       <button
          style={{backgroundColor:"orange"}}
          className="btn regular xlg fw-right mt-5"
        >
          Looking for Rider 
        </button>
        </div>}
        
        
      </Modal.Body>
    </Modal>
    )
}

export default Rider;