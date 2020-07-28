import React, { Component } from 'react';


class ChatContainer extends Component{
    render(){
        return (
           <div>
                {this.props.children}
           </div>
        )
    }
}

export default ChatContainer