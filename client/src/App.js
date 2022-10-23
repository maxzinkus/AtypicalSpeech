import React, {useState} from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import axios from 'axios'
import LoginForm from './components/LoginForm'

const api = axios.create({
  baseURL: `http://localhost:3001/`
})

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Home />} />
    </Routes>
  )
}

export default App