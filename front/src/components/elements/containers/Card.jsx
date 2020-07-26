import React, { Component } from 'react';
import './Container.css'

class Card extends Component{
    render(){
        
        return (
            <div className={"card "+this.props.size}>
                {this.props.children}
            </div>
        )
    }
}

export default Card