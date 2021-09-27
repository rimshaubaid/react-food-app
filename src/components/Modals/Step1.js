import React,{useState} from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "./Step.css";
import {Link} from 'react-router-dom';
import close from "../../assets/svgs/close.svg";
import logout from "../../assets/svgs/log-out.svg";
import Signup from '../Signup/Signup';
import Signup2 from '../Signup/Signup2';
import "../../assets/css/modal.css";
const Step1 = (props) => {
  const [signup, setSignup] = useState(null);
  const [signupVal, setSignupVal] = useState(null);
  const showSignup = (event, key) => {
    event.preventDefault();
    setSignup(key);
  };
  const setSignupValue = (data) => {
    setSignupVal(data);
  };
const SignUPclose = () => {
    setSignup(null);
    console.log("Sign up close");
  };
  
  
  return (
    <Modal
      show={props.show}
      onHide={props.closeModal}
      dialogClassName="modal-smd maxwidth500"
      centered
    >
    <Signup
          show={signup === 1 ? true : false}
          closeModal={() => setSignup(null)}
          nextStep={() => setSignup(2)}
          setSignup={setSignupValue}
          signupVal={signupVal}
        />
        <Signup2
          show={signup === 2 ? true : false}
          closeModal={() => SignUPclose(null)}
          setSignup={setSignupValue}
          signupVal={signupVal}
        />
      <Modal.Body className="p-2">
        <div className="modal-body modal-background d-flex justify-content-center align-items-end">
          <button
            type="button"
            className="close-modal-btn"
            data-dismiss="modal"
            aria-label="Close"
            onClick={props.closeModal}
          >
            <img src={close} width="20" alt="close" />
          </button>
          <div className="text-white text-center">
            <div className="font-weight-bold f40 claim">
              Claim your free drink
            </div>
            <div className="f20 sub-claim">Enjoy member benefits today</div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer no">
        <button
          type="button"
          className="btn btn-danger claim-button btn-block py-0"
          data-dismiss="modal"
          onClick={props.showNext}
        >
          {" "}
          Log in 
          <img src={logout} className="ml-2" alt="" />
        </button>
        <p>Not a member? <Link 
            data-dismiss="modal" 
            aria-label="Close"  ref={props.regRef}
                      onClick={ (event) => {showSignup(event, 1);}}>Sign Up</Link></p>
      </Modal.Footer>
    </Modal>
  );
};
Step1.propTypes = {
  closeModal: PropTypes.func.isRequired,
  showNext: PropTypes.func.isRequired,
};
export default Step1;
