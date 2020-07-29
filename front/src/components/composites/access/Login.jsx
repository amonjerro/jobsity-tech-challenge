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


class Login extends Component{
    state = {
        userInfo:'',
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
        post(process.env.REACT_APP_BACKEND_URL+'/user/login', {
            userInfo:this.state.userInfo,
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
                                size={null}
                                type='text'
                                label='Username Or Email'
                                name='userInfo'
                                value={this.state.userInfo}
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
                            <Button text='Log In' type='submit' color="main" disabled={this.state.showLoader}/>
                           {this.state.showLoader ? (<span>Validating credentials...</span>) : null} 
                        </CardFooter>
                    </form>
                    { this.state.errorMessage ? (<ErrorMessage text={this.state.errorMessage}/>) : null }
                </Card>
            </CentralContainer>
        )
    }
}

export default Login