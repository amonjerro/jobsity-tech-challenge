import React, { Component } from 'react';
import List from '../../elements/list/List';
import ListElement from '../../elements/list/ListElement';
import InfoMessage from '../../elements/wells/InfoMessage';
import { get } from '../../../utilities/API.js'


class ChatList extends Component{
    state={
        data:[],
        activeIndex:null,
        errorMessage:null
    }
    handleSelect=(e)=>{
        this.props.chatSelect(e.target.id)
        this.setState({activeIndex:parseInt(e.target.dataset.index, 10)})
    }
    loadRooms=()=>{
        get(process.env.REACT_APP_BACKEND_URL+'/chat/room/ls',null,(response)=>{
            if(response.ok){
                this.setState({errorMessage:null, data:response.data})
            } else {
                this.setState({errorMessage:response.message, data:[]})
            }
        })
    }
    populateRooms=()=>{
        let results = this.state.data.map((element, index)=>{
            let active = this.state.activeIndex===index
            return (<ListElement key={element.uuid} dark={true} active={active} identifier={element.uuid} index={index} onClick={(e)=>this.handleSelect(e)}>{element.roomName}</ListElement>)
        })
        return results
    }
    componentDidMount(){
        this.loadRooms()
        this.props.socket.on('new_room', (params)=>{
            let newData = this.state.data
            newData.push(params)
            this.setState({
                data:newData
            })
        })
    }
    render(){
        return (
           <div>
               {this.state.errorMessage ? (<InfoMessage text={this.state.errorMessage} dark={true}/>) : 
               (<List>
                   {this.populateRooms()}
               </List>)}
           </div>
        )
    }
}

export default ChatList