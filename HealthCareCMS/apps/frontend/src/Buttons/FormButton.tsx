import React from "react";

interface FormButtonProps {
  onClick: () => void;
  text: string;
  isLoading:boolean
}

const FormButton: React.FC<FormButtonProps> = ({ onClick, text, isLoading }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full pt-1 h-12 bg-[#3B9AB8] text-white rounded-lg flex justify-center items-center ${isLoading ? " animate-pulse cursor-not-allowed" : ""}`}
    >
      {text}
    </button>
  );
};

export default FormButton;
