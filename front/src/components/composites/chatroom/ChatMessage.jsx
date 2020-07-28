import React, { Component } from 'react';
import MessageBubble from '../../elements/chat/MessageBubble';

class ChatMessage extends Component{
    render(){
        let me = localStorage.getItem('userName')
        let myself = this.props.userName === me
        let bot = this.props.userName === 'bot'
        return (
            <MessageBubble myself={myself} bot={bot} text={this.props.text} createdAt={this.props.createdAt} userName={this.props.userName}/>
        )
    }
}

export default ChatMessage