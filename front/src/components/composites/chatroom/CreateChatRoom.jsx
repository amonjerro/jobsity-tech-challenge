import React, { Component } from 'react';
import TextInput from '../../elements/form/TextInput';
import ErrorMessage from '../../elements/wells/ErrorMessage';
import Button from '../../elements/form/Button';
import { post } from '../../../utilities/API'

class ChatEntry extends Component{
    state={
        roomName:'',
        errorMessage:null
    }
    handleUpdate=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit= (e)=>{
        e.preventDefault()
        this.setState({errorMessage:null})
        post(process.env.REACT_APP_BACKEND_URL+'/chat/room/create', {
            roomName:this.state.roomName
        },(data)=>{
            if(data.ok){
                this.props.updateParent()
            } else{
                this.setState({errorMessage:data.message})
            }
            
        })
    }
    render(){
        return (
            <form onSubmit={(e)=>this.handleSubmit(e)}>
            <TextInput
                label=''
                size='size-1'
                name='roomName'
                class={null}
                value={this.state.roomName}
                handleChange={this.handleUpdate}
            />
            <Button text='Create Room' type='submit' color="main"/>
            {this.state.errorMessage ? (<ErrorMessage text={this.state.errorMessage}/>) : null}
            </form>
        )
    }
}

export default ChatEntry