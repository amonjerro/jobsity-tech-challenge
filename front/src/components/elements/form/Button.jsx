import React, { Component } from 'react';
import './Form.css';

class Button extends Component{
    render(){
        let className = 'btn'
        return (
        <div>
            <button className={className} type={this.props.type} onClick={this.props.click}>{this.props.text}</button>
        </div>
        )
    }
}

export default Button