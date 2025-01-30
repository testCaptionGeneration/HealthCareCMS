
import React from "react";

interface UserTypeSelectorProps {
  usertype: "doctor" | "patient";
  setUsertype: React.Dispatch<React.SetStateAction<"doctor" | "patient">>;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ usertype, setUsertype }) => {
  return (
    <div className="flex gap-4 mb-6 md:mb-8">
      <button
        className={`px-6 py-3 text-base font-semibold rounded-lg ${usertype === "doctor" ? "bg-[#3B9AB8] text-white" : "bg-gray-100 text-gray-600 border border-gray-300"}`}
        onClick={() => setUsertype("doctor")}
      >
        Doctor Sign In
      </button>
      <button
        className={`px-6 py-3 text-base font-semibold rounded-lg ${usertype === "patient" ? "bg-[#3B9AB8] text-white" : "bg-gray-100 text-gray-600 border border-gray-300"}`}
        onClick={() => setUsertype("patient")}
      >
        Patient Sign In
      </button>
    </div>
  );
};

export default UserTypeSelector;
