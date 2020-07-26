import React, { Component } from 'react';
import './Container.css'

class SidePanel extends Component{
    render(){
        return (
            <div className="panel lateral">
                <div className='container'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default SidePanel