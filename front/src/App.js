import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './components/composites/access/Login';
import Register from './components/composites/access/Register';
import Layout from './components/composites/layout/Layout';
import { limitAccess } from './utilities/Security';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact render = {(props)=>{
          return(<Login {...props}/>)
        }}>

        </Route>
        <Route path='/register' exact render = {(props)=>{
          return(<Register {...props}/>)
        }}>

        </Route>
        <Route path = '/' render = {(props)=>{
          if (limitAccess()){
            return (<Redirect to='/login' />)
          }
          return (<Layout {...props}/>)
        }}/>
      </Switch>
    </Router>
    
  );
}

export default App;
