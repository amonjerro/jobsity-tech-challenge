import React, { Component } from 'react';
import List from '../../elements/list/List';
import ListElement from '../../elements/list/ListElement';
import { get } from '../../../utilities/API.js'


class ChatList extends Component{
    componentDidMount(){
        get(process.env.REACT_APP_BACKEND_URL+'/chat/rooms/ls',(data)=>{
            console.log(data)
        })
    }
    render(){
        return (
           <div>
               <List>

               </List>
           </div>
        )
    }
}

export default ChatList