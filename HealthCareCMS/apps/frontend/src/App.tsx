import { useState } from 'react'
import Dashboard from './Components/Dashboard'
import Med from './Components/Med'
import Upper from './Components/Upper'
import './App.css'
import Navbar from './Components/Navbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      

      <Dashboard/>
      </div>
    </>
  )
}

export default App
