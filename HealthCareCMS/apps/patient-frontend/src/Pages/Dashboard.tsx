import Medication from "../Components/Medication";
import {NavbarComponent} from "../Components/NavbarComponent"
import Upper from "../Components/Upper";

const Dashboard:React.FC=()=>{
    return<>
    <NavbarComponent/>
    <Upper/>
    <Medication/>
    </>
}
export default Dashboard;