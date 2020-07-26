import React, { Component } from 'react';
import List from '../../elements/list/List';
import ListElement from '../../elements/list/ListElement';
import InfoMessage from '../../elements/wells/InfoMessage';
import { get } from '../../../utilities/API.js'


class ChatList extends Component{
    state={
        data:[],
        errorMessage:null
    }
    componentDidMount(){
        get(process.env.REACT_APP_BACKEND_URL+'/chat/room/ls',null,(response)=>{
            if(response.ok){
                
            } else {
                this.setState({errorMessage:response.message})
            }
        })
    }
    render(){
        return (
           <div>
               {this.state.errorMessage ? (<InfoMessage text={this.state.errorMessage} dark={true}/>) : (<List></List>)}
               
           </div>
        )
    }
}

export default ChatList