import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import SidePanel from '../../elements/containers/SidePanel'
import CentralPanel from '../../elements/containers/MainPanel'
import Footer from '../../elements/containers/Footer'
import PanelTitle from '../../elements/typography/PanelTitle'
import Logout from '../access/Logout'
import ChatList from '../chatroom/ChatList'
import ChatRoom from '../chatroom/ChatRoom'
import { read } from '../../../utilities/Cookie'


class Layout extends Component{
    state = {
        socket:null,
        room:null
    }
    changeChat = (room) =>{
        let currentRoom = this.state.room
        this.state.socket.emit('join', {room})
        if(currentRoom){
            this.state.socket.emit('leave',{room:currentRoom})
        }
        this.setState({room})
    }
    connectSocket = () =>{
        let token = read('backend-token')
        const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL, {query:{token}})
        this.setState({
            socket:socket
        })
    }
    setupBeforeUnloadListener = () =>{
        window.addEventListener('beforeunload', (ev)=>{
            this.state.socket.disconnect()
        })
    }
    componentDidMount(){
        this.setupBeforeUnloadListener()
        this.connectSocket()
    }
    render(){
        return (
            <div>
                {this.state.socket ? (<SidePanel>
                    <PanelTitle text={'Available Chats'}/>
                    <ChatList chatSelect={this.changeChat} socket={this.state.socket}/>
                    <Footer centered='centered'>
                        <Logout {...this.props}/>
                    </Footer> 
                </SidePanel>) : (<SidePanel>
                    <Footer>
                        <Logout {...this.props}/>
                    </Footer> 
                </SidePanel>)}
                
                <CentralPanel>
                    {(this.state.room && this.state.socket) ? (<ChatRoom room={this.state.room} socket={this.state.socket}/>) : null}
                </CentralPanel>
            </div>
        )
    }
}

export default Layout