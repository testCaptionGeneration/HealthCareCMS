import { useParams } from "react-router-dom"
import { NavbarComponent } from "../Components/NavbarComponent"
import { PatientOverview } from "../Components/PatientOverview"
import { PageWrapper } from "../Wrapper/PageWrapper"

export const PatientPage = () => {
    const {doctorId=""}=useParams();
   return<div> 
        <NavbarComponent DoctorId={doctorId}/>
        <div className="flex justify-center">
            <PatientOverview/>
        </div>
        </div>
}