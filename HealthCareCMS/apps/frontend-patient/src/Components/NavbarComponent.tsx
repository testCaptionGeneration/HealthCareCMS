import { useState } from "react";
import { LogoIcon } from "../Icons/LogoIcon";
import { Button} from './Button'

const defaultStyle = "px-4 mx-2 font-bold text-[#3B9AB8]";

export const NavbarComponent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>

      <div className="hidden sm:flex justify-center mt-2">
        <div className="w-full max-w-[1400px] h-[70px] flex justify-between items-center p-4 shadow-md rounded-lg border border-slate-300">
    
          <div className="flex items-center text-lg font-bold text-[#3B9AB8]">
            <LogoIcon size={28.84} />
            <span className="ml-2">HealthCareCMS</span>
          </div>

          <div className="flex items-center">
            {/* <div className={`${defaultStyle} cursor-pointer`}>Records</div>
            <div className={`${defaultStyle} cursor-pointer`}>Connect</div>
            <div className={`${defaultStyle} cursor-pointer`}>Profile</div> */}
            <Button size="md" variant="primary" title="Logout" />
          </div>
        </div>
      </div>


      <div className="sm:hidden">
        <div className="flex justify-between items-center p-4 shadow-md border-b border-slate-300">

          <div className="flex items-center text-lg font-bold text-[#3B9AB8]">
            <LogoIcon size={28.84} />
            <span className="ml-2">HealthCareCMS</span>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-[#3B9AB8] border border-slate-300 rounded-md"
          >
            ☰
          </button>
        </div>


        <div
          className={`fixed top-0 left-0 h-full bg-white shadow-md transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50 w-[250px]`}
        >
          <div className="p-4 flex items-center justify-between border-b border-slate-300">
            <span className="text-lg font-bold text-[#3B9AB8]">Menu</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 text-[#3B9AB8] border border-slate-300 rounded-md"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-col mt-4 space-y-4">
            <div className={`${defaultStyle} cursor-pointer px-6`}>Records</div>
            <div className={`${defaultStyle} cursor-pointer px-6`}>Connect</div>
            <div className={`${defaultStyle} cursor-pointer px-6`}>Profile</div>
            <div className="px-6">
              <Button size="md" variant="primary" title="Logout" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
