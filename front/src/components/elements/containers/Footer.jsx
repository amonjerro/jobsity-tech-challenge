import React, { Component } from 'react';
import './Container.css'

class Footer extends Component{
    render(){
        return (
            <div className="footer">
                {this.props.children}
            </div>
        )
    }
}

export default Footer