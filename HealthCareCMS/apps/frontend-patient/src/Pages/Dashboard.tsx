import Medication from "../Components/Medication";
import {NavbarComponent} from "../Components/NavbarComponent"
import Upper from "../Components/Upper";

const Dashboard:React.FC=()=>{
    return<>
    <NavbarComponent/>
    <button
  onClick={() => {
    window.location.href = "http://localhost:5000";
  }}
  className="absolute flex items-center justify-center gap-2 px-6 py-3 border-none bg-transparent cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 active:scale-100 rounded-full group right-0 bottom-0 m-10"
>
  {/* Background Layer */}
  <span className="absolute inset-0 bg-blue-700 rounded-full shadow-[0px_4px_12px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:shadow-[0px_6px_20px_rgba(0,0,0,0.3)]"></span>

  {/* Icon (Optional, Subtle) */}
  <span className="relative z-10 w-5 text-gray-300">
    🤖
  </span>

  {/* Button Text */}
  <span className="relative z-10 text-lg font-medium text-gray-100 tracking-wide">
    AI Assistance
  </span>
</button>

    <Upper/>
  
    </>
}
export default Dashboard;