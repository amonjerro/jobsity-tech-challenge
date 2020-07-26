import React, { Component } from 'react';
import './Container.css'

class CardBody extends Component{
    render(){
        return (
            <div className="card-body">
                {this.props.children}
            </div>
        )
    }
}

export default CardBody