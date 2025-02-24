import { ReactElement } from "react";

interface ButtonProps {
  size?: "lg" | "md" | "sm";
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  title: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  className?: string; // Extra classes for customization
}

const sizeStyles = {
  lg: "px-12 py-4 text-xl rounded-xl",
  md: "px-7 py-2 text-md rounded-lg",
  sm: "px-5 py-1 text-sm rounded-md",
};

const variantStyles = {
  primary:
    "bg-[#3B9AB8] text-white shadow-lg hover:shadow-md focus:ring-4 transition-all duration-300",
  secondary:
    "bg-white text-[#3B9AB8] border border-gray-300 shadow-md hover:shadow-xl hover:bg-gray-100 transition-all duration-300",
  disabled: "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none hover:bg-gray-300",
};

export const Button = ({
  size = "md",
  startIcon,
  endIcon,
  title,
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 mx-2  
        ${sizeStyles[size]}  
        ${disabled ? variantStyles.disabled : variantStyles[variant]}  
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}  
        transition-transform active:scale-95 ${className}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      <span className="font-semibold">{title}</span>
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};
