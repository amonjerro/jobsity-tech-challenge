import React, { Component } from 'react';


class ChatContainer extends Component{
    render(){
        return (
           <div className="chat-content">
                {this.props.children}
           </div>
        )
    }
}

export default ChatContainer