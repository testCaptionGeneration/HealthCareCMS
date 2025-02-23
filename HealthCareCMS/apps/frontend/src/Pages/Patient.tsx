import { PatientOverview } from "../Components/PatientOverview"
import { PageWrapper } from "../Wrapper/PageWrapper"

export const PatientPage = () => {
    return<div> 
        <PageWrapper>
        <div className="flex justify-center">
            <PatientOverview/>
        </div>
        </PageWrapper>
        </div>
}