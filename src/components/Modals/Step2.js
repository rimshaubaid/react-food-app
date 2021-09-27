import React from "react";
import { Modal, InputGroup, Form, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import "./Step.css";
import "../../assets/css/component.css";
import "../../assets/css/modal.css";
import close from "../../assets/svgs/close.svg";
import warley from "../../assets/svgs/warley.svg";
import { useForm } from "react-hook-form";

const Step2 = (props) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    let olddata = { ...props.signInVal, ...data };
    props.setLoginValue(olddata);
    props.showNext();
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
            <img src={warley} width="263px" height="55px" alt="warley" />

            <div className="mt-5 pt-3">
              <div className="input-title mb-2">Phone number</div>
              <InputGroup className="mb-2 mr-sm-2 phone-group">
                <InputGroup.Prepend>
                  {/* <InputGroup.Text>@</InputGroup.Text> */}
                  <Form.Group controlId="exampleForm.ControlSelect1 px-1">
                    <Form.Control as="select" {...register("ccode")}>
                      <option>UL</option>
                      <option>LG</option>
                      <option>IN</option>
                      <option>BEL</option>
                      <option>AUS</option>
                    </Form.Control>
                  </Form.Group>
                </InputGroup.Prepend>
                <FormControl
                  autoComplete="off"
                  required
                  {...register("phone")}
                  id="inlineFormInputGroupUsername2"
                  placeholder=""
                  minLength="11"
                />
              </InputGroup>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <div className="warley-description">
                Warely Pass can be used to log in to any <br />
                restaurant partners with Warely.
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer no">
          <button
            type="submit"
            className="btn btn-danger rounded font-weight-bold btn-block py-3 f18"
            data-dismiss="modal"
          >
            {" "}
            Log in
          </button>
          <div className="powered my-4 w-100">Powered by Warely</div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
Step2.propTypes = {
  closeModal: PropTypes.func.isRequired,
  showNext: PropTypes.func.isRequired,
};
export default Step2;
