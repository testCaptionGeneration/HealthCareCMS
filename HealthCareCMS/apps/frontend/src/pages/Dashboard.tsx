
import { DoctorPatientChatComponent } from '../Components/DashboardBlockComponents/DoctorPatientChat'
import { NavbarComponent } from '../Components/NavbarComponent'
import { PatientSeverityComponent } from '../Components/DashboardBlockComponents/PatientSeverity'
import { TodayPatientCard } from '../Components/DashboardBlockComponents/TadaysPatientVisitsCardComponent'
import { ViewAnalysisCard } from '../Components/DashboardBlockComponents/ViewAnalysisCardComponent'

export const Dashboard=()=> {

  return (
    <div className='text-slate-700 min-h-screen xl:fixed  min-w-screen relative bg-gradient-to-t from-gray-800 to-gray-100 '>
      <NavbarComponent />

      <div className='flex justify-center'>
        <div className='grid xl:grid-cols-2 lg:grid-cols-2 xl:gap-10 xl:fixed '>
          <div >
            <TodayPatientCard />
            <ViewAnalysisCard />
          </div>
          <div>
            <PatientSeverityComponent/>
            <DoctorPatientChatComponent />
          </div>
        </div>
      </div>



    </div>
  )
}


