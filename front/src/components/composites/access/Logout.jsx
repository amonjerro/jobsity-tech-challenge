import React, { Component } from 'react';
import Button from '../../elements/form/Button';
import { del } from '../../../utilities/Cookie.js'

class Logout extends Component{
    handleLogout=()=>{
        del('backend-token')
        this.props.history.push('/')
    }
    render(){
        return (
            <div >
                <Button text={'Logout'} click={this.handleLogout}/>
            </div>
        )
    }
}

export default Logout