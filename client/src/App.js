import React, {useState} from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'

const api = axios.create({
  baseURL: `http://localhost:3001/`
})

function App() {

  return (
    <Router>
      <div className='App'>
        <div className='Content'>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/dashboard">
              <Dashboard/>
            </Route>
          </Switch>
        </div>
      </div> 
    </Router>
  )
}

export default App