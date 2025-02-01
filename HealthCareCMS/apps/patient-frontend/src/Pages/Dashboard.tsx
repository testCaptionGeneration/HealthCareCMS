import Medication from "../Components/Medication";
import Navbar from "../Components/Navbar"
import Upper from "../Components/Upper";

const Dashboard:React.FC=()=>{
    return<>
    <Navbar/>
    <Upper/>
    <Medication/>
    </>
}
export default Dashboard;