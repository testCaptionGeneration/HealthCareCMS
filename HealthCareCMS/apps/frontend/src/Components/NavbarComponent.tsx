import { LogoIcon } from "../Icons/LogoIcon"
import { LogoutIcon } from "../Icons/LogoutIcon"
import { Button } from "./Button"

const defaultStyle="px-4 mx-2 font-bold  text-[#3B9AB8]"
export const NavbarComponent=()=>{
    return <div className="flex justify-center mt-2">

        <div className="w-7xl h-<90>  flex justify-between p-4 shadow-lg rounded-lg cursor-pointer  ">
            
            <div className="flex items-center text-lg font-bold text-[#3B9AB8]">
                <LogoIcon size={28.84}/>
                HealthCareCMS
            </div>

            <div className="flex items-center">
                <div className={defaultStyle}>Records</div>
                <div    className={defaultStyle}>Profile</div>
                <Button startIcon={<LogoutIcon size={5}/>} size="md" variant="primary" title="Logout"/>
            </div>
        </div>
            
            
        
    </div>
}
