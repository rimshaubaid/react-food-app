import React, { Component } from 'react';
var sprintf = require('sprintf-js').sprintf;

export default class LocalizedMessage extends Component {

    render() {
        let message = localStorage.dictionary && JSON.parse(localStorage.getItem('dictionary'))[this.props.messageKey];
        return (
                
            <span  className={this.props.className}>
                {this.props.customerNumber ? sprintf(message, this.props.customerNumber) : message }
            </span>
        )
    }
}