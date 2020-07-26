import React,{Component} from 'react';
import './Wells.css'

class InfoMessage extends Component{
	render(){
        let dark = this.props.dark ? 'dark-info' : 'info'
		return(
			<div className={'well '+dark}>
				<p>{this.props.text}</p>
			</div>
		)
	}
}

export default InfoMessage;