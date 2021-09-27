/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
export default class SaInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            value: '',
            readOnly: false
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
        // console.log('this.props.required' + this.props.label);
        // console.log(this.props.readOnly);

     



    }
    handleClickOutside = () => {
        //  console.log(this.state.value);

        var str = this.state.value;
        if (str.length > 0) {

            this.setState({ isOpen: true });
        } else {
            this.setState({ isOpen: false });
        }

    }

    _onFocus = e => {

        //console.log(e.target.value);
        this.setState({ isOpen: true });
    }

    onChange = e => {


        var name = e.target.name;
        var value = e.target.value;




        this.setState({ [name]: value });
        this.props.setState({ [name]: value });

        this.props.handleChange(name,value);


    }

    render() {
        return (
            <div className={`form-group md-form`}>
                <label data-error="wrong" data-success="right" className={this.state.isOpen ? 'active' : ''}>{this.props.label}</label>
                <input 
                   disabled={this.props.disabled && this.props.disabled}
                    type={this.props.type}
                    onFocus={this._onFocus}
                    onChange={this.onChange}
                    name={this.props.name}
                    defaultValue={this.props.value}
                    autoFocus={this.props.autoFocus}
                    className="form-control"
                    readOnly={this.props.readOnly}
                    required={this.props.required}
                    pattern={this.props.pattern && this.props.pattern}
                />

            </div>
        )

    }
}