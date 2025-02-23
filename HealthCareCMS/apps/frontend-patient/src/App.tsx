

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Patient from './Pages/Patient'
import { PastprescriptionRecord } from './Pages/PastprescriptionRecord'
import AllPastPrescription from './Pages/Allpastprescription'

function App() {
  

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/patient" element={<Patient/>} />
        <Route path ="patient/patient-dashboard" element={<Dashboard/>}/>
        <Route path="patient/pastPrescription/:prescriptionId/:patientId" element={<PastprescriptionRecord />} />
        <Route path="patient/patient-dashboard/allprescriptions" element={<AllPastPrescription/>} />
      </Routes >
      </BrowserRouter>
  )
}

export default App
