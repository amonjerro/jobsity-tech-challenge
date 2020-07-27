import React, { Component } from 'react';
import './List.css'

class ListElement extends Component{
    render(){
        let dark = this.props.dark ? ' dark' : ''
        let active = this.props.active ? ' active' : ''
        return (
            <li className={'list-element'+dark+active} onClick={this.props.onClick} id={this.props.identifier} data-index={this.props.index} >
                {this.props.children}
            </li>
        )
    }
}

export default ListElement