import './App.css';
import { PrescriptionComponent } from './Pages/Prescription';
import { Dashboard } from './Pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import DoctorDashboard from "./Dashboard/DoctorDashboard";
import PatientDashboard from "./Dashboard/PatientDashboard";
import ProtectedRoute from "./Protected/ProtectedRoute";
import { PatientPage } from './Pages/Patient';
import { AnalysisPage } from './Pages/Analysis';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/cms/v1/doctor/dashboard/:doctorId" element={<Dashboard />} />
        <Route path="/cms/v1/doctor/patient/prescription/:prescriptionId" element={<PrescriptionComponent />} />
        <Route path="/cms/v1/doctor/search/patientDetails/:doctorId/:patientId" element={<PatientPage />} />
        <Route path="/cms/v1/doctor/analysis/:doctorId" element={<AnalysisPage/>}/>
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
