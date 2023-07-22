import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

import PropTypes from "prop-types";
import "../../assets/css/component.css";
import "./signup.css";
import "../../assets/css/modal.css";
import close from "../../assets/svgs/close.svg";
import warley from "../../assets/svgs/warley.svg";
import { Signup, ClearState } from "../../actions/productActions";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import PopUp from "../Modals/Popup";
const Signup2 = (props) => {
  const { register,reset, handleSubmit } = useForm();
  const [load, setLoad] = useState(false);
  const [lshow, setLshow] = useState(false);
  const [popupText, setPopupText] = useState("");
  useEffect(() => {
    if (props.signup && !props.loading && props.signup.success && load) {
      console.log("____Not Errors______");
      setLoad(false);
      localStorage.removeItem('cart');
      setPopupText("Registration Successfully !");
      setLshow(true);
      reset();
      //props.closeModal();
      props.ClearState();
    } else if (props.errors && load) {
      //alert(JSON.stringify(props.errors.data));
      setLoad(false);
      props.ClearState();
    }
  }, [load, props]);

  //signup

  const onSubmit = (data) => {
    let olddata = { ...props.signupVal, ...data };
    props.setSignup(olddata);
    props.Signup(olddata);
    setLoad(true);
  };

  const closeModal = () => {
    props.closeModal();
    setLshow(false);
  };
  return (
    <Modal
      show={props.show}
      onHide={props.closeModal}
      dialogClassName="maxwidth500"
      centered
    >
      <PopUp text={popupText} show={lshow} closeModal={closeModal} />
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
            <div className="signup-subtitle">Sign up for WARELY account 2</div>

            <div className="">
              <div className="input-title mb-2">Email</div>
              <div className="mb-2">
                <input
                  type="email"
                  className="form-control-lg input input-full"
                  required
                  autoComplete="off"
                  {...register("email")}
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="input-title mb-2">Password</div>
              <div className="mb-2">
                <input
                  required
                  minLength="7"
                  autoComplete="off"
                  {...register("password")}
                  type="password"
                  className="form-control-lg input input-full"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="input-title mb-2">Confirm Password</div>
              <div className="mb-2">
                <input
                  required
                  minLength="7"
                  autoComplete="off"
                  {...register("cpassword")}
                  type="password"
                  className="form-control-lg input input-full"
                />
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <div className="footer-warley-description text-left w-100">
                By signing up, you have read and agreed to our
                <br />
                <span>
                  <a href={null} className="text-danger cursor">
                    Terms & Conditions
                  </a>
                </span>
                &nbsp; and &nbsp;
                <span>
                  <a href={null} className="text-danger cursor">
                    Privacy Policy.
                  </a>
                </span>
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
          <div className="powered my-4 w-100">Powered by Warely</div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
Signup2.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  signup: state.products.signup,
  loading: state.products.loading,
  auth: state.auth,
  errors: state.products.errors,
});

export default withTranslation()(
  connect(mapStateToProps, { Signup, ClearState })(Signup2)
);
