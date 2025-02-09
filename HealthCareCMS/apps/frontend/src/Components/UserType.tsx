import React from "react";

interface UserTypeSelectorProps {
  usertype: "doctor" | "patient";
  setUsertype: React.Dispatch<React.SetStateAction<"doctor" | "patient">>;
  mode: "signup" | "signin";
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ usertype, setUsertype, mode }) => {
  const getButtonText = (type: "doctor" | "patient") => {
    return mode === "signup"
      ? `${type === "doctor" ? "Doctor" : "Patient"} Sign Up`
      : `${type === "doctor" ? "Doctor" : "Patient"} Sign In`;
  };

  return (
    <div className="flex gap-4 mb-6 md:mb-8">
      <button
        className={`px-6 py-3 text-base font-semibold rounded-lg ${
          usertype === "doctor" ? "bg-[#3B9AB8] text-white" : "bg-gray-100 text-gray-600 border border-gray-300"
        }`}
        onClick={() => setUsertype("doctor")}
      >
        {getButtonText("doctor")}
      </button>
      <button
        className={`px-6 py-3 text-base font-semibold rounded-lg ${
          usertype === "patient" ? "bg-[#3B9AB8] text-white" : "bg-gray-100 text-gray-600 border border-gray-300"
        }`}
        onClick={() => setUsertype("patient")}
      >
        {getButtonText("patient")}
      </button>
    </div>
  );
};

export default UserTypeSelector;
