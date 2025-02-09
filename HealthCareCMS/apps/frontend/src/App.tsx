import './App.css'
import { PrescriptionComponent } from './pages/Prescription'
import { Dashboard } from './pages/Dashboard'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DoctorDashboard from "./Dashboard/DoctorDashboard";
import PatientDashboard from "./Dashboard/PatientDashboard";
import ProtectedRoute from "./Protected/ProtectedRoute";

function App() {

  return <BrowserRouter>
  <Routes>
 
    <Route path="/" element={<SignUp />} />
    <Route path="/sign-in" element={<SignIn />} />


    <Route path="/cms/v1/doctor/dashboard" element={<Dashboard />} />
    <Route path="/cms/v1/doctor/patient/prescription/:userId" element={<PrescriptionComponent />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
    </Route>
  </Routes>
</BrowserRouter>

}


export default App;
