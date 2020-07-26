import React, { Component } from 'react';
import TextInput from '../../elements/form/TextInput';
import { Link } from 'react-router-dom';
import Button from '../../elements/form/Button';
import Card from '../../elements/containers/Card'
import CardFooter from '../../elements/containers/CardFooter'
import CardBody from '../../elements/containers/CardBody'
import CentralContainer from '../../elements/containers/CentralContainer'
import ErrorMessage from '../../elements/wells/ErrorMessage'
import { post } from '../../../utilities/API.js';
import { set } from '../../../utilities/Cookie.js';


class Register extends Component{
    state = {
        userName:'',
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        errorMessage:null,
        showLoader:false
    }
    handleUpdate = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit = (e) =>{
        this.setState({errorMessage:null,showLoader:true});
        e.preventDefault();
        post(process.env.REACT_APP_BACKEND_URL+'/user/register', {
            userName:this.state.userName,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email:this.state.email,
            password:this.state.password
        }, (data)=>{
            if(data.ok){
                set('backend-token',data.token)
                localStorage.setItem('userName',data.userName)
                this.props.history.push('/')
            } else {
                this.setState({
                    errorMessage:data.message,
                    showLoader:false
                })
            }
        })
    }
    render(){
        return (
            <CentralContainer>
                <Card size='sm-card'>
                    <form onSubmit={this.handleSubmit}>
                        <CardBody>
                            <TextInput 
                                class={null}
                                size='size-2'
                                type='text'
                                label='Username'
                                name='userName'
                                value={this.state.userName}
                                handleChange={this.handleUpdate}
                            />
                            <TextInput 
                                class={null}
                                size='size-2'
                                type='text'
                                label='Email'
                                name='email'
                                value={this.state.email}
                                handleChange={this.handleUpdate}
                            />
                            <TextInput 
                                class={null}
                                size='size-2'
                                type='text'
                                label='First Name'
                                name='firstName'
                                value={this.state.firstName}
                                handleChange={this.handleUpdate}
                            />
                            <TextInput 
                                class={null}
                                size='size-2'
                                type='text'
                                label='Last Name'
                                name='lastName'
                                value={this.state.lastName}
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
                            <Link to='/login'>Already have an account? Log in, instead!</Link>
                        </CardBody>
                        <CardFooter>
                            <Button text='Register' type='submit' color="main" disabled={this.state.showLoader}/>
                        </CardFooter>
                    </form>
                    { this.state.errorMessage ? (<ErrorMessage text={this.state.errorMessage}/>) : null }
                </Card>
                
            </CentralContainer>
        )
    }
}

export default Register