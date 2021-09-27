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
export default class SaAddAccountInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            value: '',
            focus: true,
            index: 0
        }
        this._onFocus = this._onFocus.bind(this)
    }

    //    componentDidMount() {
    //        document.addEventListener('mousedown', this.handleClickOutside);
    //    }
    //
    //    componentWillUnmount() {
    //        document.removeEventListener('mousedown', this.handleClickOutside);
    //    }
    componentDidMount() { // console.log('RENDER ACCOUNT');


        this.setState({
            index: this.props.name,
            account_number: this.props.inputFiled[this.props.name] && this.props.inputFiled[this.props.name].account_number,

            sub_name: this.props.inputFiled[this.props.name].sub_name && this.props.inputFiled[this.props.name].sub_name,
            open: this.props.inputFiled[this.props.name].open && this.props.inputFiled[this.props.name].open,
            close: this.props.inputFiled[this.props.name].close && this.props.inputFiled[this.props.name].close,

            amount_deposit: this.props.inputFiled[this.props.name].amount_deposit && this.props.inputFiled[this.props.name].amount_deposit,
            period: this.props.inputFiled[this.props.name].period && this.props.inputFiled[this.props.name].period,
            birth_date: this.props.inputFiled[this.props.name].birth_date && this.props.inputFiled[this.props.name].birth_date


        });

        // console.log(this.props);


    }


    _onChange = e => {
        var name = e.target.name;
        var value = e.target.value
        var oldInputFiled = this.props.inputFiled;
        var inputObj = '';

        if (name === "account_number") {
            oldInputFiled[this.state.index]['account_number'] = parseInt(value);
        } else if (name === "sub_name") {

            oldInputFiled[this.state.index]['sub_name'] = value;
        } else if (name === "open") {
            oldInputFiled[this.state.index]['open'] = value;
        } else if (name === "close") {
            oldInputFiled[this.state.index]['close'] = value;
        } else if (name === "amount_deposit") {
            oldInputFiled[this.state.index]['amount_deposit'] = parseInt(value);
        } else if (name === "period") {
            oldInputFiled[this.state.index]['period'] = parseInt(value);
        } else if (name === "birth_date") {
            oldInputFiled[this.state.index]['birth_date'] = value;
        }


        // oldInputFiled[this.state.index][name] = value;
        // console.log(oldInputFiled);
        this.props.setState({inputFiled: oldInputFiled});

        this.setState({[name]: value});

    }

    chengeFocus = (index) => {

        this.props.handelClose(index);

        // this.setState({ focus: true });
    }
    _onFocus(e) {
        if (!this.state.focus) {
            this.setState({focus: true});
        }

       // console.log(e.target.value);
    }
    _onKeyUp(e) {
       // console.log(e);
    }

    render() {
        return (
            <Accordion defaultActiveKey={
                this.props.isOpen
            }>
                <Card>
                    <Card.Header>
                        <Button onClick={
                                () => {
                                    this.chengeFocus(this.state.index)
                                }
                            }
                            className="btn-block"
                            variant="warning">
                            {
                            this.props.label
                        } </Button>

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


                                        <input required={true}
                                            placeholder={'হিসাব নম্বর'}
                                            onChange={
                                                this._onChange
                                            }
                                            autoFocus={
                                                this.state.focus
                                            }
                                            type="number"
                                            className="form-control"
                                            defaultValue={
                                                this.props.value && this.props.value
                                            }
                                            name="account_number"/>
                                    </Row>

                                </Col>
                            </Row>
                            <Row className="pb-3">
                                <Col lg={5}>
                                    ভর্তির তারিখ
                                </Col>
                                <Col lg={7}>
                                    <Row>
                                        <input required={true}
                                            placeholder={'শুরু তারিখ'}
                                            onChange={
                                                this._onChange
                                            }
                                            type="date"
                                            className="form-control"
                                            defaultValue={
                                                this.state.open
                                            }
                                            name={'open'}/>
                                    </Row>
                                </Col>
                            </Row>

                            {
                            (this.props.product_id === 3 || this.props.product_id === 10) && <>
                                <Row className="pb-3">
                                    <Col lg={5}>
                                        মেয়াদ
                                    </Col>
                                    <Col lg={7}>
                                        <select onChange={
                                                this._onChange
                                            }
                                            defaultValue={
                                                this.props.inputFiled[this.props.name].period && this.props.inputFiled[this.props.name].period
                                            }
                                            required={true}
                                            className="sa-custome-select custom-select  form-control"
                                            name="period">
                                            <option></option>
                                            <option value="60">
                                               ৫ বছর
                                            </option>
                                            <option value="120">
                                               ১০ বছর 
                                            </option>
                                        </select>


                                    </Col>
                                </Row>
                                <Row className="pb-3">
                                    <Col lg={5}>
                                        আমানতের পরিমান
                                    </Col>
                                    <Col lg={7}>
                                        <input required={true}
                                            placeholder=""
                                            onChange={
                                                this._onChange
                                            }
                                            name="amount_deposit"
                                            type="number"
                                            className="form-control"
                                            defaultValue={
                                                this.state.amount_deposit && this.state.amount_deposit
                                            }/>


                                    </Col>
                                </Row>
                            </>
                        }


{
                            (this.props.product_id === 4 ) && <>
                                <Row className="pb-3">
                                    <Col lg={5}>
                                        মেয়াদ
                                    </Col>
                                    <Col lg={7}>
                                        <select onChange={
                                                this._onChange
                                            }
                                            defaultValue={
                                                this.props.inputFiled[this.props.name].period && this.props.inputFiled[this.props.name].period
                                            }
                                            required={true}
                                            className="sa-custome-select custom-select  form-control"
                                            name="period">
                                            <option></option>
                                            <option value="79">
                                            ৬ বছর ৭ মাস 
                                            </option>
                                            
                                        </select>


                                    </Col>
                                </Row>
                                <Row className="pb-3">
                                    <Col lg={5}>
                                        আমানতের পরিমান
                                    </Col>
                                    <Col lg={7}>
                                        <input required={true}
                                            placeholder=""
                                            onChange={
                                                this._onChange
                                            }
                                            name="amount_deposit"
                                            type="number"
                                            className="form-control"
                                            defaultValue={
                                                this.state.amount_deposit && this.state.amount_deposit
                                            }/>


                                    </Col>
                                </Row>
                            </>
                        }


                            {
                            (this.props.product_id === 11 || this.props.product_id === 9 || this.props.product_id === 5) && <Row className="pb-3">
                                <Col lg={3}>
                                    নাম
                                </Col>
                                <Col lg={9}
                                    className="pl-0">
                                    <input required={true}
                                        placeholder="পূর্ণাঙ্গ নাম"
                                        onChange={
                                            this._onChange
                                        }
                                        name="sub_name"
                                        type="text"
                                        className="form-control"
                                        defaultValue={
                                            this.state.sub_name && this.state.sub_name
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
                                    <input required={true}
                                        placeholder="জন্ম তারিখ"
                                        onClick={
                                            this._onChange
                                        }
                                        onMouseLeave={
                                            this._onChange
                                        }
                                        onChange={
                                            this._onChange
                                        }
                                        name="birth_date"
                                        type="date"
                                        className="form-control"
                                        defaultValue={
                                            this.state.birth_date && this.state.birth_date
                                        }/>


                                </Col>
                            </Row>
                        }
                            <Row className="pb-3">
                                <Col lg={5}>
                                    প্রত্যাহারের তারিখ
                                </Col>
                                <Col lg={7}>
                                    <Row>

                                        <input onClick={
                                                this._onChange
                                            }
                                            onMouseLeave={
                                                this._onChange
                                            }
                                            placeholder={'প্রত্যাহারের তারিখ'}
                                            onChange={
                                                this._onChange
                                            }
                                            type="date"
                                            className="form-control"
                                            defaultValue={
                                                this.state.close
                                            }
                                            name={'close'}/>
                                    </Row>
                                </Col>
                            </Row>


                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

            </Accordion>
        )

    }
}
