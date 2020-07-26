import React,{Component} from 'react';
import './Wells.css'

class ErrorMessage extends Component{
	render(){
		return(
			<div className='well error'>
				<p>{this.props.text}</p>
			</div>
		)
	}
}

export default ErrorMessage;