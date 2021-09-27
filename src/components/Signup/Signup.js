import React, { useState, useEffect } from "react";
import {
  Modal,
  InputGroup,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../assets/css/component.css";
import "./signup.css";
import "../../assets/css/modal.css";
import close from "../../assets/svgs/close.svg";
import warley from "../../assets/svgs/warley.svg";
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import Step1 from '../Modals/Step1';
import Step2 from '../Modals/Step2';
import Step3 from '../Modals/Step3';
const Signup = (props) => {
  const { register, reset, handleSubmit } = useForm();
  const [checked, setChecked] = useState(1);
  
   const [signInVal, setSignInVal] = useState(null);
  const[show,setShow]=useState(null);
   const [clLogin, setClogin] = useState(false);
  const onSubmit = (data) => {
    let olddata = { ...props.signupVal, ...data };
    olddata.gender = checked;
    props.setSignup(olddata);
    props.nextStep();
    reset();
  };
const showModal = (event, val) => {
    event && event.preventDefault();
    setShow(val);
  };

  const ChnageChecked = (value) => {
    setChecked(value);
  };
 const setLoginValue = (data) => {
    setSignInVal(data);
  };
  const loginClicked = (data) => {
    if (data.password && data.phone && !clLogin) {
      props.loginUser(data, true);
      setClogin(true);
    }
  };
const CloseloggedIn = () => {
    setShow(null);

  };

  function handleClick(event){
   event.preventDefault();
   props.closeModal()
    
   showModal(event,1)
  }
  return (
    <Modal
      show={props.show}
      onHide={props.closeModal}
      dialogClassName="maxwidth500"
      centered
    >
    <Step1 
          show={show === 1 ? true : false}
          closeModal={() => setShow(null)}
          showNext={(event) => showModal(event, 2)}
        />

        <Step2
          show={show === 2 ? true : false}
          closeModal={() => setShow(null)}
          signInVal={signInVal}
          setLoginValue={setLoginValue}
          showNext={(event) => showModal(event, 3)}
        />

       <Step3
          signInVal={signInVal}
          loginClicked={loginClicked}
          setLoginValue={setLoginValue}
          show={show === 3 ? true : false}
          closeModal={CloseloggedIn}
        />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="px-5 py-4">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={props.closeModal}
          >
            <img src={close} width="20" alt="close" />
          </button>
          <div className="text-center mt-5">
            <img src={warley} width="263px" height="55px" alt="warley" />
            <div className="signup-subtitle">Sign up for WARELY account 1</div>

            <div className="">
              <div className="input-title mb-2">First name</div>
              <div className="mb-2">
                <input
                  minLength={3}
                  required
                  type="text"
                  autoComplete="off"
                  {...register("fname")}
                  className="form-control-lg input input-full"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="input-title mb-2">Last name</div>
              <div className="mb-2">
                <input
                  minLength={3}
                  required
                  type="text"
                  autoComplete="off"
                  {...register("lname")}
                  className="form-control-lg input input-full"
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="input-title mb-2">Gender</div>

              <div className="app-radio-inline">
                <Row className="gender">
                  <Col className="6">
                    <Button
                      size="lg"
                      onClick={() => ChnageChecked(1)}
                      variant={checked === 1 ? "danger" : "outline-danger"}
                    >
                      {" "}
                      Mr
                    </Button>
                  </Col>
                  <Col className="6">
                    <Button
                      onClick={() => ChnageChecked(2)}
                      size="lg"
                      variant={checked === 2 ? "danger" : "outline-danger"}
                    >
                      {" "}
                      Ms
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="mt-3 pt-3">
              <div className="input-title mb-2">Phone number</div>
              <InputGroup className="mb-2 mr-sm-2 phone-group">
                <InputGroup.Prepend>
                  {/* <InputGroup.Text>@</InputGroup.Text> */}
                  <Form.Group controlId="exampleForm.ControlSelect1 px-1">
                    <Form.Control {...register("ccode")} as="select">
                      <option>UL</option>
                      <option>LG</option>
                      <option>IN</option>
                      <option>BEL</option>
                      <option>AUS</option>
                    </Form.Control>
                  </Form.Group>
                </InputGroup.Prepend>
                <FormControl
                  type="number"
                  required
                  minLength={11}
                  maxLength={14}
                  {...register("phone")}
                  id="inlineFormInputGroupUsername2"
                  placeholder=""
                />
              </InputGroup>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <div className="footer-warley-description">
                Once succesfully created, you can use WARELY account across all
                partners with WARELY
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <button
            type="submit"
            className="btn btn-danger rounded font-weight-bold btn-block py-3 f18"
            data-dismiss="modal"
            
          >
            Sign up
          </button>
          <p>Already a member? <Link 
            aria-label="Close" 
            onClick={handleClick}
            >Log in</Link></p>
          <div className="powered my-4 w-100">Powered by Warely</div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Signup;
