import React from 'react';
import axios from 'axios';
import PinInput from 'react-pin-input';
import MobileHome from '../MobileHome/MobileHome';
export default function Example() {
const authURL = process.env.REACT_APP_API_BASE_URL;
var tableNo ;
const [showTableNumber,setTableNumber]=React.useState(false);
const [num,setNum]=React.useState('');
function handleSubmit(number){
  setNum(number)
  return(
   setTableNumber(true)

  )
}
  return (
    <div >
    <div className="d-sm-none">
    
  
{showTableNumber?<MobileHome table={num}/> :<div style={{paddingTop:"30%",textAlign:"center"}}>
<h6 ><strong>Enter PIN </strong>to open table</h6>
<PinInput 
  length={4} 
  initialValue=""
  secret 
  onChange={(value, index) => {} }
  type="numeric" 
  inputMode="number"
  style={{padding: '10px'}}  
  inputStyle={{borderColor: 'grey',borderRadius:"2px solid"}}
  inputFocusStyle={{borderColor: 'blue'}}
  onComplete={(value, index) => {
  setTableNumber(false)
  const pin={table_pin:value}
  axios.post(authURL +'table_selection', pin)
        .then(response => {
        tableNo=response.data.data[0].table_no;
       handleSubmit(tableNo)
       
        })
        .catch(error => console.log(error.response));
        }
        }
  autoSelect={true}
  regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
/></div>}
    


</div>



</div>
  );
 
}