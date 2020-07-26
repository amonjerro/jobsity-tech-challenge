import React, { Component } from 'react';
import './Form.css';

class InputText extends Component{
    render(){
        let className = this.props.class ? this.props.class : 'input-text-group'
        let size = this.props.size ? this.props.size : 'size-1'
        return (
            <div className={className+' '+size}>
                <div className='label-container'>
                    <label className='label'>{this.props.label}</label>
                </div>
                <div className='input-container'>
                    <input className='input' type={this.props.type} name={this.props.name} onChange={this.props.handleChange} value={this.props.value}/>
                </div>           
            </div>
        )
    }
}

export default InputText