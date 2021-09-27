/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, {Component} from 'react';

import {
    Accordion,
    Row,
    Col,
    Card,
    Button
} from 'react-bootstrap';
export default class SaAddViewAccountInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            value: '',
            focus: true,
            index: 0
        }
    }

    //    componentDidMount() {
    //        document.addEventListener('mousedown', this.handleClickOutside);
    //    }
    //
    //    componentWillUnmount() {
    //        document.removeEventListener('mousedown', this.handleClickOutside);
    //    }


    chengeFocus = (index) => {

        // this.props.handelClose(index);

        // this.setState({ focus: true });
    }

    render() {
        return (
            <Accordion defaultActiveKey="1">
                <Card>
                    <Card.Header>
                        <Row>


                            <Button className="btn-block" variant="success">
                                {
                                this.props.label
                            } </Button>
                        </Row>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body className="pt-0">
                            {/* <small className="row pl-3 mb-2 text-center">ভর্তি ফি  : ২০ টাকা</small> */}
                            <Row className="pb-3">
                                <Col lg={5}>
                                    হিসাব নম্বর
                                </Col>
                                <Col lg={7}>
                                    <Row>


                                        <input disabled={true}
                                            placeholder={'হিসাব নম্বর'}
                                            type="number"
                                            className="form-control"
                                            defaultValue={
                                                this.props.inputFiled[this.props.name].account_number && this.props.inputFiled[this.props.name].account_number
                                            }
                                            name="account_number"/>
                                    </Row>

                                </Col>
                            </Row>
                            <Row className="pb-3">
                                <Col lg={5}>
                                    শুরু তারিখ
                                </Col>
                                <Col lg={7}>
                                    <Row>
                                        <input disabled={true}
                                            placeholder={'শুরু তারিখ'}
                                            type="date"
                                            className="form-control"
                                            defaultValue={
                                                this.props.inputFiled[this.props.name].open && this.props.inputFiled[this.props.name].open
                                            }
                                            name={'open'}/>
                                    </Row>
                                </Col>
                            </Row>

                            {
                            (this.props.product_id === 3 || this.props.product_id === 4 || this.props.product_id === 10 ) &&  <>
                                <Row className="pb-3">
                                    <Col lg={5}>
                                        মেয়াদ
                                    </Col>
                                    <Col lg={7}>
                                        <select disabled={true}
                                            defaultValue={
                                                this.props.inputFiled[this.props.name].period && this.props.inputFiled[this.props.name].period
                                            }
                                            required={true}
                                            className="sa-custome-select custom-select  form-control"
                                            name="period">
                                            <option></option>
                                            <option value="5">
                                                5
                                            </option>
                                            <option value="10">
                                                10
                                            </option>
                                        </select>


                                    </Col>
                                </Row>
                                <Row className="pb-3">
                                    <Col lg={5}>
                                        আমানতের পরিমান
                                    </Col>
                                    <Col lg={7}>
                                        <input disabled={true}
                                            onChange={
                                                this.onChange
                                            }
                                            name="amount_deposit"
                                            type="number"
                                            className="form-control"
                                            defaultValue={
                                                this.props.inputFiled[this.props.name].amount_deposit && this.props.inputFiled[this.props.name].amount_deposit
                                            }/>


                                    </Col>
                                </Row>
                            </>
                        }

                            {/* {
                            this.props.product_id === 10 && <>
                                <Row className="pb-3">
                                    <Col lg={5}>
                                        মেয়াদ
                                    </Col>
                                    <Col lg={7}>
                                        <select disabled={true}
                                            defaultValue={
                                                this.props.inputFiled[this.props.name].period && this.props.inputFiled[this.props.name].period
                                            }
                                            required={true}
                                            className="sa-custome-select custom-select  form-control"
                                            name="period">
                                            <option></option>
                                            <option value="5">
                                                5
                                            </option>
                                            <option value="10">
                                                10
                                            </option>
                                        </select>


                                    </Col>
                                </Row>
                                <Row className="pb-3">
                                    <Col lg={5}>
                                        আমানতের পরিমান
                                    </Col>
                                    <Col lg={7}>
                                        <input disabled={true}
                                            onChange={
                                                this.onChange
                                            }
                                            name="amount_deposit"
                                            type="number"
                                            className="form-control"
                                            defaultValue={
                                                this.props.inputFiled[this.props.name].amount_deposit && this.props.inputFiled[this.props.name].amount_deposit
                                            }/>


                                    </Col>
                                </Row>
                            </>
                        } */}

                            {
                            (this.props.product_id === 11 || this.props.product_id === 9 || this.props.product_id === 5) && <Row className="pb-3">
                                <Col lg={3}>
                                    নাম
                                </Col>
                                <Col lg={9}
                                    className="pl-0">
                                    <input disabled={true}
                                        placeholder="পূর্ণাঙ্গ নাম"
                                        onChange={
                                            this.onChange
                                        }
                                        name="sub_name"
                                        type="text"
                                        className="form-control"
                                        defaultValue={
                                            this.props.inputFiled[this.props.name].sub_name && this.props.inputFiled[this.props.name].sub_name
                                        }/>


                                </Col>
                            </Row>
                        }

                            {
                            (this.props.product_id === 11) && <Row className="pb-3">
                                <Col lg={3}>
                                    জন্ম তারিখ
                                </Col>
                                <Col lg={9}
                                    className="pl-0">
                                    <input disabled={true}
                                        placeholder="জন্ম তারিখ"
                                        name="birth_date"
                                        type="date"
                                        className="form-control"
                                        defaultValue={
                                            this.props.inputFiled[this.props.name].birth_date && this.props.inputFiled[this.props.name].birth_date
                                        }/>


                                </Col>
                            </Row>
                        }
                            {
                            this.props.inputFiled[this.props.name].close && <Row className="pb-3">
                                <Col lg={5}>
                                    প্রত্যাহারের তারিখ
                                </Col>
                                <Col lg={7}>
                                    <Row>

                                        <input disabled={true}
                                            placeholder={'প্রত্যাহারের তারিখ'}
                                            type="date"
                                            className="form-control"
                                            defaultValue={
                                                this.props.inputFiled[this.props.name].close && this.props.inputFiled[this.props.name].close
                                            }
                                            name={'close'}/>
                                    </Row>
                                </Col>
                            </Row>
                        } </Card.Body>
                    </Accordion.Collapse>
                </Card>

            </Accordion>
        )

    }
}
