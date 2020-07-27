import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import SidePanel from '../../elements/containers/SidePanel'
import CentralPanel from '../../elements/containers/MainPanel'
import Footer from '../../elements/containers/Footer'
import PanelTitle from '../../elements/typography/PanelTitle'
import Logout from '../access/Logout'
import ChatList from '../chatroom/ChatList'
import ChatRoom from '../chatroom/ChatRoom'



class Layout extends Component{
    state = {
        socket:null,
        room:null
    }
    changeChat = (room) =>{
        this.state.socket.emit('join', {room})
        this.setState({room})
    }
    connectSocket = () =>{
        const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL)
        this.setState({
            socket:socket
        })
        socket.on('join_success', (data)=>{
            console.log(data)
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
                    <Footer>
                        <Logout {...this.props}/>
                    </Footer> 
                </SidePanel>) : (<SidePanel>
                    <Footer>
                        <Logout {...this.props}/>
                    </Footer> 
                </SidePanel>)}
                
                <CentralPanel>
                    {this.state.room ? (<ChatRoom room={this.state.room} socket={this.state.socket}/>) : null}
                </CentralPanel>
            </div>
        )
    }
}

export default Layout