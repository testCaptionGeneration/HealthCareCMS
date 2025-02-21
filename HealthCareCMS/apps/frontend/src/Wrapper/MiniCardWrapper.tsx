import { ReactElement } from "react"

export const MiniCardWrapper=({children}:{children?:ReactElement})=>{
    return <div className="w-100 rounded-md shadow-md h-50 mx-10 mt-5 mb-0 bg-white">
        {children}
    </div>
}