import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "./Step.css";
import "../../assets/css/component.css";
import "../../assets/css/modal.css";
import close from "../../assets/svgs/close.svg";
import { useForm } from "react-hook-form";
import { loginUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import ResetPassword from './ResetPassword';
const Step3 = (props) => {
  const { register, handleSubmit,reset } = useForm();
  const [isResetPassword,setResetPassword]=React.useState(false);
  const onSubmit = (data) => {
    let olddata = { ...props.signInVal, ...data };
    props.setLoginValue(olddata);
    props.loginClicked(olddata);
    reset();

  };

  return (
    <Modal
      show={props.show}
      onHide={props.closeModal}
      dialogClassName="modal-md xs"
      contentClassName="xs"
      centered
  
    >
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
            <div className="back-heading">Good to have you back!</div>
            <div className="warley-description">
              Special deals waiting for you!
            </div>
            <div className="mt-5">
              <div className="input-title mb-2">Password</div>
              <div className="mb-2">
                <input
                  type="password"
                  autoComplete="off"
                  {...register("password")}
                  placeholder=""
                  className="form-control-lg input input-full"
                />
              </div>
            </div>
            <div data-dismiss="modal" 
              onClick={() => { 
              setResetPassword(true);
                }} 
              className=" text-left my-3 warley-description">
              Reset your password
            </div>
            
          </div>
          <ResetPassword show={isResetPassword} onHide={() => setResetPassword(false)} />
        </Modal.Body>
        <Modal.Footer className="modal-footer no">
          <button
            type="submit"
            className="btn btn-block btn-danger font-weight-bold py-3 rounded f18"
            data-dismiss="modal"
          >
            {" "}
            Log in
            <img src="images/log-out.svg" className="ml-2" alt="" />
          </button>
          <div className="powered my-4 w-100">Powered by Warely</div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
Step3.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  login: state,
  loading: state.products.loading,
});
export default withTranslation()(
  connect(mapStateToProps, { loginUser })(Step3)
);
