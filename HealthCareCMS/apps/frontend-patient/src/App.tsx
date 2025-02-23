

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Patient from './Pages/Patient'
import { PastprescriptionRecord } from './Pages/PastprescriptionRecord'

function App() {
  

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/patient" element={<Patient/>} />
        <Route path ="patient/patient-dashboard" element={<Dashboard/>}/>
        <Route path="patient/pastPrescription/:prescriptionId/:patientId" element={<PastprescriptionRecord />} />
      </Routes >
      </BrowserRouter>
  )
}

export default App
