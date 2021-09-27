import React from 'react';
import Modal from 'react-bootstrap/Modal';
import close from "../../assets/svgs/close.svg";
import axios from 'axios';
import "../../assets/css/modal.css";
import PropTypes from "prop-types";
import "../../assets/css/component.css";

function ResetPasswordModal(props){

const authURL = process.env.REACT_APP_API_BASE_URL;
const [passwordemail,setEmail]=React.useState('');

 function handleSubmit() {
  axios({
    method:'post',
    url:authURL + 'password/email',
    data:{
      email:passwordemail
    },
  }).catch(error => {
    console.log(error.response.data)
  }).then(response => {
    console.log(response.data);
  })

  }

  function handleChange(event){
    setEmail(event.target.value);
    event.preventDefault();
  }
    return(
<Modal
      show={props.show}
      onHide={props.closeModal}
      dialogClassName="modal-md md"
      contentClassName="md"
      centered
    >
    <form onSubmit={handleSubmit}>
        <Modal.Body className=" px-5 py-4">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={props.closeModal}
          >
            <img onClick={props.onHide} src={close} width="20" alt="close" />
          </button>
          <div style={{marginBottom:'5%'}} className="text-center mt-5">
            <div className="back-heading">Good to have you back!</div>
            <div className="warley-description">
              Special deals waiting for you!
            </div>
            <div className="mt-3">
              <div className="input-title mb-2">Email</div>
              <div className="mb-2">
                <input
                  type="email"
                  className="form-control-lg input input-full"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer no">
          <button
            className="btn btn-block btn-danger font-weight-bold py-3 rounded f18"
            onClick={props.closeModal}
           type="submit"
          >
            {" "}
            PROCEED
            <img src="images/log-out.svg" className="ml-2" alt="" />
          </button>
          <div className="powered my-4 w-100">Powered by Warely</div>
        </Modal.Footer>
      </form>    
    </Modal>
    )
}

ResetPasswordModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
}

export default ResetPasswordModal;