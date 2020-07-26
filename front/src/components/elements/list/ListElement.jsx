import React, { Component } from 'react';
import './List.css'

class ListElement extends Component{
    render(){
        return (
            <li className={'list-element'}>
                {this.props.children}
            </li>
        )
    }
}

export default ListElement