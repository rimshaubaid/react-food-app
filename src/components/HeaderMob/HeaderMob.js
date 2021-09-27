import React from 'react';
import Button from 'react-bootstrap/Button';
import '../Header/Header.css';

function HeaderMob(props){
  
    return(
<div className="is">
<div className="page-header">
  <div  className="d-block d-sm-none">
            
        
            <Button style={{margin:'0'}} className="pull-right table-Button" variant="danger">
              Table no <span>{props.table}</span>
            </Button>
            
            </div>
          </div>
        
         </div>
     
  
    )
}

export default HeaderMob;