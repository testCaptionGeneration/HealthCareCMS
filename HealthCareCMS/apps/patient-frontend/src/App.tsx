import { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Patient from './Pages/Patient'
function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path="/patient" element={<Patient/>} />
        <Route path="/signin " element={<Signin/>} />
        <Route path ="/patient-dashboard" element={<Dashboard/>}/>
        <Route path="/patient-dashboard/Priscription" />
      </Routes >
      </BrowserRouter>
    </>
  )
}

export default App
