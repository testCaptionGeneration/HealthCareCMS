import { ReactNode } from "react";
import { NavbarComponent } from "../Components/NavbarComponent"
import { useParams } from "react-router-dom";

export const PageWrapper = ({ children }: { children: ReactNode }) => {
    const doctorId=useParams().doctorId
    return <div className="w-screen h-screen  ">
        <div>
            <NavbarComponent doctorId={doctorId} />
            <div>
                {children}
            </div>
        </div>
    </div>
}