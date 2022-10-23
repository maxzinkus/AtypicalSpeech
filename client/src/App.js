import React, {useState} from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import axios from 'axios'
import LoginForm from './components/LoginForm'

const api = axios.create({
  baseURL: `http://localhost:3001/`
})

function App() {

  const [error, setError] = useState("");

  const Login = details => {
    console.log(details)
  }

  return (
    <Routes>
      <Route path="/" element={<Home Login={Login} error={error} />} />
    </Routes>
  )
}

export default App