import React, {useState} from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import axios from 'axios'
import AccessCodeForm from './components/AccessCodeForm'

const api = axios.create({
  baseURL: `http://localhost:3001/`
})

function App() {

  const [error, setError] = useState("");

  const Login = details => {
    // let response = await api.post('login', {accessCode: "TEST"});
    console.log(details)
  }

  return (
    <Routes>
      <Route path="/" element={<AccessCodeForm Login={Login} error={error} />} />
    </Routes>
  )
}

export default App