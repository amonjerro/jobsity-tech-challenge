import React, { Component } from 'react';
import { zeroPad } from '../../../utilities/Utils'
import './Chat.css'

class MessageBubble extends Component{
    processDateTime(){
        let d = new Date(this.props.createdAt)
        return `${zeroPad(d.getMonth()+1,1)}/${zeroPad(d.getDate(),1)} - ${zeroPad(d.getHours(),1)}:${zeroPad(d.getMinutes(),1)}`
    }
    render(){
        let mine = this.props.myself ? 'mine' : 'not-mine'
        let bot = this.props.bot ? ' bot' : ''
        let botUser = this.props.bot ? ' bot-user':''
        return (
           <div className={'message '+mine+bot}>
               <div className='message-header'>
                <span className={'message-user'+botUser}>{this.props.userName}</span><span className="header-divider">-</span>
                <span className='message-datetime'>{this.processDateTime()}</span>
               </div>
               <p className='message-content'>{this.props.text}</p>
           </div>
        )
    }
}

export default MessageBubble