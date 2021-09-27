/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
export default class SaDateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            value: '',
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
            this.setState({isOpen: true});
        }

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
                <div className={'form-group md-form '}>
                    <label   className={this.state.isOpen ? 'active' : ''}>{this.props.label}</label>
                    <input type="text"
                           onChange={this.onChange} 
                           name={this.props.name}  
                           defaultValue={this.props.value}  
                           className="form-control" 
                          
                           />
                
                </div>
                )

    }
}