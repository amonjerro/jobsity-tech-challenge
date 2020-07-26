import React, { Component } from 'react';
import './List.css'

class List extends Component{
    render(){
        return (
            <div className='list-container'>
                <ul className='list'>
                    {this.props.children}
                </ul>
            </div>
        )
    }
}

export default List