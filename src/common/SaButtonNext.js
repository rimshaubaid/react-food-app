/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';

import LocalizedMessage from './LocalizedMessage';
export default class SaButtonNext extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            value: '',
            readOnly: false
        }
    }


    componentDidMount() {




    }



    render() {
        return (
            <button onClick={this.props.clickFunc} disabled={this.props.disabled} className="btn btn-indigo btn-rounded nextBtn float-right waves-effect waves-light" type="button"> <LocalizedMessage messageKey={this.props.messageKey} /></button>

        )

    }
}