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
                console.log(response.data)
            } else {
                console.log(response.message)
            }
        })
    }
    componentDidUpdate(){
        console.log('Updating')
        this.loadChatMessages()
        //Call for the 
    }
    componentDidMount(){
        this.loadChatMessages()
        //Call for the room in the props 
    }
    render(){
        return (
           <div>
               <ChatContainer>
                    <ChatMessage text='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod' createdAt={new Date().toISOString()} userName='test'/>
                    <ChatMessage text='tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam' createdAt={new Date().toISOString()} userName='not-test'/>
                    <ChatMessage text='consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse' createdAt={new Date().toISOString()} userName='bot'/>
               </ChatContainer>
               <Footer>
                    <ChatEntry socket={this.props.socket}/>
               </Footer>
           </div>
        )
    }
}

export default ChatRoom