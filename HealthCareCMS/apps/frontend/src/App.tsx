
import Dashboard from './Pages/Dashboard'
import Priscription from './Pages/Priscription'

import {BrowserRouter ,Routes,Route} from"react-router-dom"
import SignUp from './Pages/SignUp' 
import SignIn from './Pages/SignIn'


const App :React.FC= () => {
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/patient-dashboard" element={<Dashboard/>} />
        <Route path="/patient-dashboard/priscription" element={<Priscription/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App;
