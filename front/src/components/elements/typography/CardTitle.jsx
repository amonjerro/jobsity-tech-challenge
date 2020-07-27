import React,{Component} from 'react';
import './Typography.css'

class CardTitle extends Component{
	render(){
		return(
			<div className='card title-container'>
				<h3 className='title-text'>{this.props.text}</h3>
			</div>
		)
	}
}

export default CardTitle;