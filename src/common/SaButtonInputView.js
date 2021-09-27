/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
import { Link }
    from 'react-router-dom';
import { Accordion, Card, Button } from 'react-bootstrap';
export default class SaButtonInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            value: '',
            focus: true
        }
    }

    //    componentDidMount() {
    //        document.addEventListener('mousedown', this.handleClickOutside);
    //    }
    //
    //    componentWillUnmount() {
    //        document.removeEventListener('mousedown', this.handleClickOutside);
    //    }
    componentDidMount() {

        if (this.props.value) {
            this.setState({ isOpen: true });
        }

    }

    onChange = e => {
        var name = e.target.name;
        var value = e.target.value
        var oldInputFiled = this.props.inputFiled;
        oldInputFiled[name] = parseFloat(value);
        this.setState({ [name]: value });
        this.props.setState({ inputFiled: oldInputFiled });


    }

    chengeFocus = () => {

        this.setState({ focus: true });
    }

    render() {
        return (
            <Accordion defaultActiveKey={this.props.isOpen}>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle onClick={this.chengeFocus} className="btn-block" as={Button} variant="info" eventKey="1">
                            {this.props.label}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body className="pt-0">
                            <small className="row pl-3 pb-2">হিসাব নম্বর : {this.props.accountNo}</small>
                    

                    <Button className=" btn-block" variant="outline-danger" onClick={this.props.detailslezar} >বিস্তারিত দেখুন </Button>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

            </Accordion>
        )

    }
}