import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogoIcon } from "../Icons/LogoIcon";
import { Button } from "./Inputs/Button";

const defaultStyle = "px-4 mx-2 font-bold text-[#3B9AB8] cursor-pointer";

interface NavbarComponentProps {
  DoctorId?: string;
}

export const NavbarComponent: React.FC<NavbarComponentProps> = ({ DoctorId }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewAnalysis = () => {
    if (!DoctorId) {
      console.error("Doctor ID is not available");
      return;
    }
    navigate(`/cms/v1/doctor/analysis/${DoctorId}`);
  };

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="hidden sm:flex justify-center mt-2">
        <div className="w-full bg-white max-w-[1400px] h-[70px] flex justify-between items-center p-4 shadow-md rounded-lg">
          <div className="flex items-center text-lg font-bold text-[#3B9AB8]">
            <LogoIcon size={28.84} />
            <span className="ml-2">HealthCareCMS</span>
          </div>
          <div className="flex items-center">
            <Link to="/records" className={defaultStyle}>Records</Link>
            <div className={defaultStyle} onClick={handleViewAnalysis}>View Analysis</div>
            <Link to="/connect" className={defaultStyle}>Connect</Link>
            <Link to="/profile" className={defaultStyle}>Profile</Link>
            <Button size="md" variant="primary" title="Logout" onClick={handleLogout} />
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="sm:hidden">
        <div className="flex justify-between items-center p-4 shadow-md border-b border-slate-300">
          <div className="flex items-center text-lg font-bold text-[#3B9AB8]">
            <LogoIcon size={28.84} />
            <span className="ml-2">HealthCareCMS</span>
          </div>
          <button
            aria-label="Open Menu"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-[#3B9AB8] border border-slate-300 rounded-md"
          >
            ☰
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className={`fixed top-0 left-0 h-full bg-white shadow-md transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-50 w-[250px]`}>
          <div className="p-4 flex items-center justify-between border-b border-slate-300">
            <span className="text-lg font-bold text-[#3B9AB8]">Menu</span>
            <button
              aria-label="Close Menu"
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 text-[#3B9AB8] border border-slate-300 rounded-md"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-col mt-4 space-y-4">
            <Link to="/records" className={`${defaultStyle} px-6`} onClick={() => setIsSidebarOpen(false)}>Records</Link>
            <div className={`${defaultStyle} px-6`} onClick={handleViewAnalysis}>View Analysis</div>
            <Link to="/connect" className={`${defaultStyle} px-6`} onClick={() => setIsSidebarOpen(false)}>Connect</Link>
            <Link to="/profile" className={`${defaultStyle} px-6`} onClick={() => setIsSidebarOpen(false)}>Profile</Link>
            <div className="px-6">
              <Button size="md" variant="primary" title="Logout" onClick={handleLogout} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
