import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../assets/css/modal.css";
import { getOutlates } from "../../actions/productActions";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import {Link} from 'react-router-dom';
class Pickup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outlates: null,
      select: false,
      activeItem: -1,
    };
    this.outlateRenders = this.outlateRenders.bind(this);
  }
  componentDidMount() {
    this.props.getOutlates();
  }
  componentWillReceiveProps(nextprops) {
    if (
      nextprops.loading === false &&
      nextprops.outlates !== null &&
      nextprops.outlates.success
    ) {
      this.setState({ outlates: nextprops.outlates.data });
    }
  }
  selctOutlate = (e, id, name, index) => {
    let oldorder = this.props.order;
    oldorder["out_id"] = id;
    oldorder["out_name"] = name;
    this.props.setOrder(oldorder);
    this.setState({ activeItem: index });
    localStorage.setItem("outlate", id);
    localStorage.setItem("out_name", name);
  };

  outlateRenders = () => {
    
    let html = [];
    let cdata = this.state.outlates;
    if (cdata != null && Object.keys(cdata).length > 0) {
      
      Object.keys(cdata).map((key, index) =>
        html.push(
          <div
            key={key}
            className={
              this.state.activeItem === index ? "box fill" : "box outline"
            }
            onClick={(e) =>
              this.selctOutlate(e, cdata[key].id, cdata[key].name, index)
            }
          >
            <div className="ins">
              <ul>
                <li>
                  <i className="icon-5"></i>
                  <span className="txt title">{cdata[key].name}</span>
                </li>
                <li>
                  <i className="icon-6"></i>
                  <span className="txt">
                  {cdata[key].address}
                  </span>
                </li>
                <li>
                  <span className="name">Hours :</span>
                  <span className="txt">
                    {" "}
                    <span className="open">Open</span> {cdata[key].start} - {cdata[key].end}
                  </span>
                </li>
                <li>
                  <span className="name">Phone :</span>
                  <span className="txt bold">  {cdata[key].phone}</span>
                </li>
              </ul>
            </div>
          </div>
        )
      );
    }
    //  console.log(menus);
    return html;
  };

  //console.log(closeModal);
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.closeModal}
        className="rounded-lg "
        dialogClassName="modal-md xs"
        contentClassName="pickup-modal xs"
        centered
      >
        <Modal.Header className="no">
          <h4 className="modal-title">Pick up </h4>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={this.props.closeModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body className="no">
          <div className="scroll">
            <div className="box data">
              <div className="ins">
                <span>2 Store(s) Available</span>
                <Link to={'/outlets'}>View on Map</Link>
              </div>
            </div>

            {this.outlateRenders()}
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer form-action">
          <button
            className="btn lg primary d-block"
            onClick={this.props.showPickupDate}
          >
            Select this outlet
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

Pickup.propTypes = {
  closeModal: PropTypes.func.isRequired,
  showPickupDate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  outlates: state.products.outlates,
  loading: state.products.loading,
});
export default withTranslation()(
  connect(mapStateToProps, { getOutlates })(Pickup)
);
