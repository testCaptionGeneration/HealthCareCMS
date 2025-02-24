import { ReactNode } from "react";
import { NavbarComponent } from "../Components/NavbarComponent"

export const PageWrapper = ({ children }: { children: ReactNode }) => {
    return <div className="w-screen h-screen  ">
        <div>
            <NavbarComponent />
            <div>
                {children}
            </div>
        </div>
    </div>
}