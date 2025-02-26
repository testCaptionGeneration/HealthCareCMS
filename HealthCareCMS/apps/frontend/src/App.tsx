import './App.css'
import { PrescriptionComponent } from './Pages/Prescription'
import { Dashboard } from './Pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import DoctorDashboard from "./Dashboard/DoctorDashboard";
import PatientDashboard from "./Dashboard/PatientDashboard";
import ProtectedRoute from "./Protected/ProtectedRoute";
import { PatientPage } from './Pages/Patient';
import { PastPrescriptionPage } from './Pages/PastPrescription';
import { OutPatientPage } from './Pages/OutPatient';
import { AnalysisPage } from './Pages/Analysis';

function App() {

  return <BrowserRouter>
    <Routes>

      <Route path="/" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route element={<ProtectedRoute />}>


        <Route path="/cms/v1/doctor/dashboard/:DoctorId" element={<Dashboard />} />
        <Route path="/cms/v1/doctor/dashboard/outpatients/:DoctorId" element={<OutPatientPage />} />
        <Route path="/cms/v1/doctor/patient/prescription/:prescriptionId" element={<PrescriptionComponent />} />
        <Route path="/cms/v1/doctor/patient/pastPrescription/:prescriptionId/:patientId" element={<PastPrescriptionPage />} />
        <Route path="/cms/v1/doctor/search/patientDetails/:doctorId/:patientId" element={<PatientPage />} />
        <Route path="/cms/v1/doctor/analysis/:doctorId" element={<AnalysisPage/>}/>

      
      </Route>
    </Routes>
  </BrowserRouter>

}

export default App;
