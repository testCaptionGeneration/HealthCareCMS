import { ReactElement, ReactNode } from "react";

export const DashboardCard=( {children}:{children:ReactNode})=>{
    return<div className="relative  bg-white m-3 mt-0 shadow-md rounded-2xl min-w-[690px] min-h-[400px]">
        {children}
    </div>
}