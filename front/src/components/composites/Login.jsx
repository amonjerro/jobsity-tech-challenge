import React, { Component } from 'react';
import TextInput from '../elements/form/TextInput';
import { Link } from 'react-router-dom';
import Button from '../elements/form/Button';
import Card from '../elements/containers/Card'
import CardFooter from '../elements/containers/CardFooter'
import CardBody from '../elements/containers/CardBody'
import CentralContainer from '../elements/containers/CentralContainer'

class Login extends Component{
    state = {
        userInput:'',
        password:'',
        errorMessage:null,
        showLoader:false
    }
    handleUpdate = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit = (e) =>{
        console.log(this.state)
        this.setState({errorMessage:null,showLoader:true});
        e.preventDefault();
    }
    render(){
        return (
            <CentralContainer>
                <Card size='sm-card'>
                    <form onSubmit={this.handleSubmit}>
                        <CardBody>
                            <TextInput 
                                class={null}
                                size={null}
                                type='text'
                                label='Username Or Email'
                                name='userInput'
                                value={this.state.userInput}
                                handleChange={this.handleUpdate}
                            />
                            <TextInput 
                                class={null}
                                size={null}
                                type='password'
                                label='Password'
                                name='password'
                                value={this.state.password}
                                handleChange={this.handleUpdate}
                            />
                            <Link to='/register'>Don't have an account? Register for one!</Link>
                        </CardBody>
                        <CardFooter>
                            <Button text='Enviar' type='submit' color="main" disabled={this.state.showLoader}/>
                        </CardFooter>
                    </form>
                    
                </Card>
                
            </CentralContainer>
        )
    }
}

export default Login