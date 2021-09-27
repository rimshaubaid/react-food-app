import React, { useState, useEffect } from "react";
import "./Account.css";
import "../../assets/css/modal.css";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { SingleOrder, submitPayment } from "../../actions/productActions";


import { useForm } from "react-hook-form";

import axios from 'axios';

const Account = (props) => {
  const [updatedFirstName,setUpdatedFirstName]=useState("");
  const [updatedLastName,setUpdatedLastName]=useState("");
  const [updatedEmail,setUpdatedEmail]=useState("");
  const [updatedPhone,setUpdatedPhone]=useState("");
  const [updatedZip,setUpdatedZip]=useState("");
  const [updatedCity,setUpdatedCity]=useState("");
  const [updatedAddress,setUpdatedAddress]=useState("");
  const [updatedCountry,setUpdatedCountry]=useState("");
  const [updatedGender,setUpdatedGender]=useState("");
  const [fname, setFname] = useState(null);
  const [lname,setlName]=useState(null);
  const [emaill,setEmail]=useState(null);
  const [phone,setPhone]=useState(null);
  const [zip,setZip]=useState(null);
  const [city,setCity]=useState(null);
  const [address,setAddress]=useState(null);
  const [gender,setGender]=useState(null);
  const [country,setCountry]=useState(null);
  
  const authURL = process.env.REACT_APP_API_BASE_URL;
  const { register} = useForm();
  if(localStorage.headers){
    var login=JSON.parse(window.localStorage.getItem('headers'))
    var userid=login.data.user.id
    var usertoken=login.data.token;
  }
  useEffect(() => {
  console.log(updatedFirstName)
  console.log(updatedLastName)
  console.log(updatedPhone)
  console.log(updatedAddress)
  console.log(updatedEmail)
  console.log(updatedCity)
  console.log(updatedZip)
  console.log(updatedCountry)
    
 axios.get(authURL+'getUser/'+userid)
        .then(response => {
          console.log(response)
          setFname(response.data.data.fname);
          setlName(response.data.data.lname);
          setEmail(response.data.data.email);
          setCountry(response.data.data.country);
          setPhone(response.data.data.phone);
          setGender(response.data.data.gender);
          setAddress(response.data.data.address);
          setCountry(response.data.data.country);
          setZip(response.data.data.zip);
          setCity(response.data.data.city);
        })
        .catch(error => console.log(error))

        
  },[]);

 function updateFirstName(event){
   
   if(updatedFirstName===null){
      setUpdatedFirstName(fname)
   }else 
       {setUpdatedFirstName(event.target.value)}
  console.log('updated firstname is:',updatedFirstName)
  
 }

 function updateLastName(event){
   if(updatedLastName===null){
     setUpdatedLastName(lname)
   } else
        {setUpdatedLastName(event.target.value)}
        console.log('updated last name is : ' , updatedLastName)

 }

 function updateEmail(event){
  if(updatedEmail===null){
    setUpdatedEmail(emaill)
  } else 
      {setUpdatedEmail(event.target.value)}
      console.log('updated email is ' , updatedEmail)
   
 }

 

 function updatePhone(event){
    console.log(updatedPhone)
   if(updatedPhone===null){
     setUpdatedPhone(phone)
   } else 
    
    { setUpdatedPhone(event.target.value)}
   console.log('updated phone is ' , updatedPhone)
 }

 function updateGender(event){
   if(updatedGender===null){
     setUpdatedGender(gender)
   } else
   {setUpdatedGender(event.target.value)}
 }
 function updateAddress(event){
  if(updatedAddress===null){
    setUpdatedAddress(address)
  } else 
   
        {setUpdatedAddress(event.target.value);}
console.log('updated address is ' , updatedAddress)
 }

 function updateCity(event){
 if(updatedCity===null){
   setUpdatedCity(city)
 } else 
    { setUpdatedCity(event.target.value);}
   console.log('updated city is' , updatedCity)
 }

 function updateCountry(event){
 if(updatedCountry===null){
   setUpdatedCountry(country)
 } else 
     { setUpdatedCountry(event.target.value);}
     console.log('updated country is ' , updatedCountry)
 }

 function updateZip(event){
   if(updatedZip===null){
     setUpdatedZip(zip)
   } else 
    { setUpdatedZip(event.target.value);}
    console.log('updated zip' , updatedZip)

 }



 

 function handleSubmit(event){
   event.preventDefault();
  const data = { 
        id: userid,
        fname: updatedFirstName?updatedFirstName:fname,
        lname: updatedLastName?updatedLastName:lname,
        email: updatedEmail?updatedEmail:emaill,
        phone: updatedPhone?updatedPhone:phone,
        gender: updatedGender?updatedGender:gender,
        address:updatedAddress?updatedAddress:address,
        zip: updatedZip?updatedZip:zip,
        country: updatedCountry?updatedCountry:country,
        city:updatedCity?updatedCity:city
};
axios.post(authURL + 'updateUser', data)
  .then(response => {
    console.log("Status: ", response.status);
    console.log("Data: ", response.data);
  }).catch(error => {
    console.error('Something went wrong!', error);
  });
 }


 

  return (
 
    <div className="main_section">
  
      <div className="payment-gutter">
       
        <h3>USER INFORMATION</h3>
      
        <div class="form-group row">
  <div class="column" style={{marginRight:"2%"}}m>
    <div className="mt-5">
              <div className="control-label">First Name</div>
              <div className="mb-2">
                <input
                  type="text"
                  autoComplete="off"
                  onChange={updateFirstName}
                  placeholder={fname}
                  className="form-control-lg input input-full"
                />
              </div>
            </div>
  </div>
  <div class="column">
      <div className="mt-5">
              <div className="control-label">Last Name</div>
              <div className="mb-2">
                <input
                  type="text"
                  autoComplete="off"
                  onChange={updateLastName}
                  placeholder={lname}
                  className="form-control-lg input input-full"
                />
              </div>
            </div>
  </div>
</div>
<div className="row">
 <div style={{marginRight:"2%"}} className="form-group column">
                      <label className="control-label">Gender</label>
                      <div className="app-radio-inline">
                        <label className="app-radio">
                          {" "}
                          Male
                          <input
                            {...register("gender")}
                            type="radio"
                            value="1"
                            checked={gender==='1'}
                            onChange={updateGender}
                          />
                          
                          <span></span>
                        </label>
                        <label className="app-radio">
                          {" "}
                          Female
                          <input
                            {...register("gender")}
                            type="radio"
                            value="2"
                            checked={gender==='2'}
                            onChange={updateGender}
                          />
                          <span></span>
                        </label>
                      </div>
                    </div>
                    <div class="column">
     
              <div className="control-label">Email</div>
              <div className="mb-2">
                <input
                  type="email"
                  autoComplete="off"
                  onChange={updateEmail}
                  value={updatedEmail}
                  placeholder={emaill}
                  className="form-control-lg input input-full"
                />
              </div>
            
  </div>
                    </div>
                   <div className="row mt-2">
                   <div className="column2">
                    <div  className="control-label">Billing Address</div>
              <div className="mb-2">
                <input
                  type="text"
                  autoComplete="off"
                  onChange={updateAddress}
                  value={updatedAddress}
                  placeholder={address}
                  className="form-control-lg input input-full"
                />
              </div>
              </div>
              </div>
              <div className="row">
 <div style={{marginRight:"2%"}} className="form-group column">
                      <label className="control-label">Phone</label>
                    <div className="mb-2">
                <input
                  type="text"
                  autoComplete="off"
                  onChange={updatePhone}
                  value={updatedPhone}
                  placeholder={phone}
                  className="form-control-lg input input-full"
                />
              </div>
                    </div>
                    <div class="column">
     
              <div className="control-label">City</div>
              <div className="mb-2">
                <input
                  type="text"
                  autoComplete="off"
                  onChange={updateCity}
                  value={updatedCity}
                  placeholder={city}
                  className="form-control-lg input input-full"
                />
              </div>   
  </div>
                    </div>

                          <div className="row">
 <div style={{marginRight:"2%"}} className="form-group column">
                      <label className="control-label">ZIP Code</label>
                    <div className="mb-2">
                <input
                  type="text"
                  autoComplete="off"
                  onChange={updateZip}
                  value={updatedZip}
                  placeholder={zip}
                  className="form-control-lg input input-full"
                />
              </div>
                    </div>
                    <div class="column">
     
              <div className="control-label">Country</div>
             <div className="mb-2">
      
                <input
                  type="text"
                  autoComplete="off"
                  placeholder={country}
                  value={updatedCountry}
                  onChange={updateCountry}
                  className="form-control-lg input input-full"
                />
            
              </div>
  </div>
                    </div>
                     <div style={{marginBottom:"4%"}} className="form-action t2">
                    <button onClick={handleSubmit} type="submit" className="btn primary">
                      Update
                    </button>
                  </div>
                 {/* <h3 style={{marginBottom:"3%"}}>Change Password</h3>
                  <div style={{marginBottom:"5%"}} className="row">
                   
                    <div style={{marginLeft:"2%"}} className="column1">
                     <div className="control-label">New Password</div>
              <div className="mb-2">
                <input
                  type="password"
                  autoComplete="off"
                  onChange={updatePassword}
                  placeholder=""
                  className="form-control-lg input input-full"
                />
              </div>  
                    </div>
                    <div style={{marginLeft:"2%"}} className="column1">
                      <div className="control-label">Confirm Password</div>
              <div className="mb-2">
                <input
                  type="password"
                  autoComplete="on" 
                  value=""
                  onChange={matchPassword}
                  placeholder=""
                  className="form-control-lg input input-full"
                />
              </div>  
                    </div>
                  </div>
                   <div style={{marginBottom:"2%"}} className="form-action t2">
                    <button onClick={passwordUpdate} type="submit" className="btn primary">
                      Update
                    </button>
                  </div> */}
      </div>
       
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.products.orders,
  payment: state.products.payment,
  loading: state.products.loading,
});
export default withTranslation()(
  connect(mapStateToProps, { SingleOrder, submitPayment })(Account)
);
