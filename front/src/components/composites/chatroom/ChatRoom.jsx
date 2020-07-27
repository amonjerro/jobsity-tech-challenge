import React, { Component } from 'react';
import ChatEntry from './ChatEntry';
import ChatMessage from './ChatMessage';
import ChatContainer from './ChatContainer';

class ChatRoom extends Component{
    state={
        
    }
    componentDidUpdate(){
        console.log('Updating')
    }
    componentDidMount(){
        console.log('Mount')
    }
    render(){
        return (
           <div>
               <ChatContainer />
               <ChatEntry />
           </div>
        )
    }
}

export default ChatRoom