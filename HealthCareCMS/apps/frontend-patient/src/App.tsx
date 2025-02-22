

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Patient from './Pages/Patient'

function App() {
  

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/patient" element={<Patient/>} />
        <Route path ="patient/patient-dashboard" element={<Dashboard/>}/>
      
      </Routes >
      </BrowserRouter>
  )
}

export default App
