import { useState } from 'react'
import Dashboard from './Components/Dashboard'
import Med from './Components/Med'
import Upper from './Components/Upper'
import './App.css'
import Navbar from './Components/Navbar'
function App() {
  const [count, setCount] = useState(0)

const App = () => {
  return (
    <>
      <div>
      

      <Dashboard/>
      </div>
    </>
  )
}
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
