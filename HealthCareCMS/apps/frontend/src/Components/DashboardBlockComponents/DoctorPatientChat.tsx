import { Button } from "../Inputs/Button"
import { CardWrapper } from "../../Wrapper/CardWrapper"
export const DoctorPatientChatComponent = () => {
    return <CardWrapper>
            <div className="p-3">
                <div className="flex items-center font-semibold">Doctor-Patient Chat: 
                    <div className="absolute right-5"><Button title="Chat Log" size="md" variant="secondary" /></div>
                </div>

            </div>
            </CardWrapper>
  
}