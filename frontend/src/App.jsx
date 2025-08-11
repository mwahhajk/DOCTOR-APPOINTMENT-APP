import React from 'react'

import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Register from "./pages/Register"
import Login  from "./pages/Login"
import Appointment from "./pages/Appointment"
import{ToastContainer} from "react-toastify"

import "./App.css"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/appointment' element={<Appointment/>}/>
        </Routes>
        <ToastContainer position='top-center'/>
      </Router>
    </>
  )
}

export default App