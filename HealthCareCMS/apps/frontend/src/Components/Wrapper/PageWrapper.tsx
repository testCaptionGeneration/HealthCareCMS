import { ReactElement, ReactNode } from "react";
import { NavbarComponent } from "../NavbarComponent";

export const PageWrapper=({children}:{children:ReactNode})=>{
    return<div className="w-screen h-screen  ">
        <div>
            <NavbarComponent/>
        <div>
            {children}
        </div>
        </div>
    </div>
}