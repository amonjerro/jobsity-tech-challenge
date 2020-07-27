import React,{Component} from 'react';
import './Typography.css'

class PanelTitle extends Component{
	render(){
		return(
			<div className='panel title-container'>
				<h2 className='title-text'>{this.props.text}</h2>
			</div>
		)
	}
}

export default PanelTitle;