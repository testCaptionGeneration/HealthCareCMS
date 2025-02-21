import { Button } from "../Inputs/Button"
import { CardWrapper } from "../../Wrapper/CardWrapper"
export const PatientSeverityComponent = () => {
    return <CardWrapper>
            <div className="p-3">
                <div className="flex items-center font-semibold">Disease Severity Prioritization
                    <div className="absolute right-5"><Button title="View All" size="md" variant="secondary" /></div>
                </div>

            </div>
        </CardWrapper>

}