import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  title?: string;
  max?: string; // Optional max attribute
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  title,
  max, 
}) => {
  return (
    <div className="relative">
      <label className="font-medium text-[#333] text-md">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#54B9ED] focus:outline-none"
        value={value}
        onChange={onChange}
        title={title}
        {...(max ? { max } : {})} // Conditionally add max if provided
      />
      {title && (
        <span className="absolute top-full left-0 text-xs text-gray-500 mt-1">{title}</span>
      )}
    </div>
  );
};

export default InputField;
