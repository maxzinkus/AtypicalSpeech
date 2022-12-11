import React, {useState, useEffect} from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import RecordingModal from './components/RecordingModal'

const api = axios.create({
  baseURL: `http://localhost:3001/`
})

function App() {

  // const [currentState, setCurrentState] = useState(null)

  //   useEffect(() => {
  //       // GET request using fetch inside useEffect React hook
  //       fetch('http://localhost:3000/script/getScriptNum')
  //           .then(response => response.json())
  //           .then(data => console.log(data))
  //           .then(data => setCurrentState({scriptCount: data}));
    
  //       // console.log("script num app.js: ", currentState.scriptCount)
  //   }, []);

  return (
    <Router>
      <div className='App'>
        <div className='Content'>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            {/* <Route exact path="/dashboard" element={<Dashboard scriptCount={currentState.scriptCount} />}> */}
            <Route exact path="/dashboard" element={<Dashboard />}>
              <Dashboard/>
            </Route>
            {/* <Route path="/module/:id" element={<RecordingModal />}>
              <RecordingModal/>
            </Route> */}
            <Route path="/module1" element={<RecordingModal />}>
              <RecordingModal/>
            </Route>
          </Switch>
        </div>
      </div> 
    </Router>
  )
}

export default App