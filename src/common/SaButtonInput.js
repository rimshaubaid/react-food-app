/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';

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
        // var name = e.target.name;
        // var value = e.target.value
        // var oldInputFiled = this.props.inputFiled;
        // oldInputFiled[name] = parseFloat(value);
        // this.setState({ [name]: value });
        // this.props.setState({ inputFiled: oldInputFiled });


        var name = e.target.name;
        var value = e.target.value
        var oldInputFiled = this.props.inputFiled;
        var inputObj = [];
        inputObj = {
            value :parseFloat(value),
            product_id:this.props.product_id,
            account_number:this.props.accountNo

        }
       if(oldInputFiled){
   
        oldInputFiled[name]=inputObj;

        this.props.setState({ inputFiled: oldInputFiled });
       } 
        
     

        this.setState({ [name]: value });


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
                            <small className="row pl-3">হিসাব নম্বর : {this.props.accountNo}</small>
                            <small className="row pl-3 mb-2">জরিমানা : 0 টাকা</small>

                            <input onChange={this.onChange} autoFocus={this.state.focus} type="number" className="form-control" defaultValue={this.props.value} name={this.props.name} />

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

            </Accordion>
        )

    }
}