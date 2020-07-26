import React, { Component } from 'react';
import './Container.css'

class CentralContainer extends Component{
    render(){
        return (
            <div className="container central">
                {this.props.children}
            </div>
        )
    }
}

export default CentralContainer