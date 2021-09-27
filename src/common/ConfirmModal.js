import React, { Component } from 'react';
import Modal from 'react-modal';
import LocalizedMessage from './LocalizedMessage';

const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        border : '0',
        background : ''
    }
};

Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.75)';
Modal.defaultStyles.overlay.zIndex = '1050';

export default class ConfirmModal extends Component {
    
    state = {
        modalIsOpen: false,
        quoteId:0
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(null)
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    deleteItem = () => {
        this.props.deleteFunction(this.state.quoteId);
        this.closeModal();
    }

    render() {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div id="myModal">
                    <div className="modal-dialog modal-animations">
                        <div className="modal-content p-lg-5 p-sm-5 p-2 pb-5">
                            <div className="model-header">
                                <h5>দুঃখিত ! আপনার মুছে ফেলার অনুমতি নেই</h5>

                            </div>
                            
                            <div className="modal-body">
                                {/* <LocalizedMessage messageKey='confirmation.delete' /> */}
                                
                                <div className="row mt-3">
                                    <div className="col-lg-12 col-sm-12">
                                       <button type="button" className="btn cu-btn-dark btn-block" onClick={this.closeModal}><LocalizedMessage messageKey="button.cancel" /></button>

                                    </div>
                                    {/* <div className="col-lg-6 col-sm-6">
                                       <button type="button" className="btn cu-btn-primary btn-block" onClick={this.deleteItem}><LocalizedMessage messageKey="button.ok" /></button>

                                    </div> */}
                                </div>
                                
                            </div>
                           
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}