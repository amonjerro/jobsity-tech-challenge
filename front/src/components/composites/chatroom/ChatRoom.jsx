import React, { Component } from 'react'
import ChatEntry from './ChatEntry'
import ChatContainer from '../../elements/containers/ChatContainer'
import ChatMessage from './ChatMessage'
import Footer from '../../elements/containers/Footer'
import { get } from '../../../utilities/API'

class ChatRoom extends Component{
    state={
        messages:[]
    }
    loadChatMessages(){
        get(process.env.REACT_APP_BACKEND_URL+'/chat/message/ls/'+this.props.room,null, (response)=>{
            if(response.ok){
                let messages = response.data.map((element, index)=>{
                    return (<ChatMessage text={element.text} createdAt={element.createdAt} key={index} userName={element.userName}/>)
                })
                this.setState({messages:messages})
                this.scrollToChatEnd()
            } else {
                console.log(response.message)
            }
        })
    }
    paintMessages(){
        return this.state.messages
    }
    scrollToChatEnd(){
        this.endFocus.scrollIntoView({behavior:'smooth'})
    }
    componentDidUpdate(prevProps){
        if(prevProps.room !== this.props.room){
            console.log('Updating Messages')
            this.loadChatMessages()
            this.scrollToChatEnd()
        }
    }
    componentDidMount(){
        this.loadChatMessages()
        this.props.socket.on('message', (message)=>{
            let messages = this.state.messages
            messages.push((<ChatMessage text={message.text} createdAt={message.createdAt} key={message.id} userName={message.userName}/>))
            if(messages.length > parseInt(process.env.REACT_APP_CHAT_ROOM_MAX,10)){
                messages = messages.slice(1)
            }
            this.setState({messages:messages})
            this.scrollToChatEnd()
        })
    }
    render(){
        return (
           <div>
               <ChatContainer>
                   <div>
                    {this.state.messages}
                   </div> 
                    <div ref={(el)=>{ this.endFocus = el;}}/>
               </ChatContainer>
               <Footer>
                    <ChatEntry socket={this.props.socket} room={this.props.room}/>
               </Footer>
           </div>
        )
    }
}

export default ChatRoom