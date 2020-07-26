import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './components/composites/Login';
import Register from './components/composites/Register';
import { read } from './utilities/Cookie.js';

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
          return (<div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>)
        }}/>
      </Switch>
    </Router>
    
  );
}

export default App;
