import { Button } from "../Inputs/Button"
import { CardWrapper } from "../../Wrapper/CardWrapper"
export const ViewAnalysisCard = () => {
    return <CardWrapper>
            <div className="p-3">
                <div className="flex items-center font-semibold">Consultation Summary:
                    <div className="absolute right-5"><Button title="View Analysis" size="md" variant="secondary" /></div>
                </div>

            </div>
    </CardWrapper>
      
}