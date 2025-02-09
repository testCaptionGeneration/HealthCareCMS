import './App.css'
import { PrescriptionComponent } from './pages/Prescription'
import { Dashboard } from './pages/Dashboard'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path='/cms/v1/doctor/dashboard' element={<Dashboard/>}/>
      <Route path='/cms/v1/doctor/patient/prescription/:userId' element={<PrescriptionComponent/>}/>
    </Routes>
  </BrowserRouter>
  
}

export default App;
