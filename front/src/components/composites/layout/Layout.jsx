import React, { Component } from 'react';
import SidePanel from '../../elements/containers/SidePanel'
import CentralPanel from '../../elements/containers/MainPanel'
import Footer from '../../elements/containers/Footer'
import Logout from '../access/Logout'
import ChatList from '../chatroom/ChatList'


class Layout extends Component{
    state = {
        currentChat:''
    }
    changeChat = (chatId) =>{
        console.log(chatId)
    }
    render(){
        return (
            <div>
                <SidePanel>
                    <ChatList chatSelect={this.changeChat}/>
                    <Footer>
                        <Logout {...this.props}/>
                    </Footer> 
                </SidePanel>
                <CentralPanel/>
            </div>
        )
    }
}

export default Layout