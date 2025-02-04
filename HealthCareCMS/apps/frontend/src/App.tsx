import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import DoctorDashboard from "./Dashboard/DoctorDashboard";
import PatientDashboard from "./Dashboard/PatientDashboard";
import ProtectedRoute from "./Protected/ProtectedRoute";  // Import your ProtectedRoute component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        
        
        <Route element={<ProtectedRoute />}>
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        </Route>

        {/* Protected Route for Patient Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
