import React from "react";

interface FormButtonProps {
  onClick: () => void;
  text: string;
}

const FormButton: React.FC<FormButtonProps> = ({ onClick, text }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full pt-1 h-12 bg-[#3B9AB8] text-white rounded-lg flex justify-center items-center"
    >
      {text}
    </button>
  );
};

export default FormButton;
