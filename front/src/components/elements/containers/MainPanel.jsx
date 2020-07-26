import React, { Component } from 'react';
import './Container.css'

class CentralPanel extends Component{
    render(){
        return (
            <div className="panel main">
                <div className='container'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default CentralPanel