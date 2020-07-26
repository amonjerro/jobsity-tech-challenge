import React,{Component} from 'react';
import './Wells.css'

class SuccessMessage extends Component{
	render(){
		return(
			<div className='well success'>
				<p>{this.props.text}</p>
			</div>
		)
	}
}

export default SuccessMessage;