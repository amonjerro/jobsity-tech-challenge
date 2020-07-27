import React, { Component } from 'react';
import TextInput from '../../elements/form/TextInput';

class ChatEntry extends Component{
    state={
        message:''
    }
    handleUpdate=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit= (e)=>{
        console.log('Send Message')
        e.preventDefault()
    }
    render(){
        return (
           <div>
               <form onSubmit={(e)=>this.handleSubmit(e)}>
                <TextInput
                    label=''
                    size='size-1'
                    name='message'
                    class={null}
                    value={this.state.message}
                    handleChange={this.handleUpdate}
                />
               </form>
           </div>
        )
    }
}

export default ChatEntry