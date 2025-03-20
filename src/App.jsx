import { useState } from 'react'
import {BrowserRouter as Router,Routes, Route, useNavigate} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import './App.css'


function App() {
  

  return (
      <>
      <Router>
      <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      </Routes>
      </Router>
      </>
        
  )
}

export default App
