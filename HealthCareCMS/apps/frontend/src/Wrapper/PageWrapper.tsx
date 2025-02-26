import { ReactNode } from "react";
import { NavbarComponent } from "../Components/NavbarComponent"
import { useParams } from "react-router-dom";

export const PageWrapper = ({ children }: { children: ReactNode }) => {
    const DoctorId=useParams().DoctorId
    return <div className="w-screen h-screen  ">
        <div>
            <NavbarComponent DoctorId={DoctorId} />
            <div>
                {children}
            </div>
        </div>
    </div>
}