import { ReactElement } from "react";

interface ButtonInterface {
  size: "lg" | "sm" | "md";
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  title?: string;
  variant: "primary" | "secondary";
  onClick?: () => void;
}

const sizeStyle = {
  lg: "px-12 py-4 text-xl rounded-xl hover:bg-[#47B3D5] active:scale-95",
  md: "px-7 py-1 text-md rounded-full hover:bg-[#47B3D5] active:scale-95",
  sm: "px-8 py-1 text-sm rounded-sm hover:bg-[#47B3D5] active:scale-95",
};

const variantStyles = {
  primary: "bg-[#3B9AB8] text-white shadow-lg hover:shadow-md focus:ring-4 focus:transition-all duration-300",
  secondary:
    "bg-[#ffffff] text-[#3B9AB8] border border-slate-200 shadow-md hover:shadow-xl hover:bg-[#f1f1f1]  focus: transition-all duration-300",
};

export const Button = (props: ButtonInterface) => {
  return (
    <button
      className={`flex items-center justify-center gap-1   ${sizeStyle[props.size]} ${variantStyles[props.variant]} cursor-pointer`} onClick={props.onClick}
    >
      {props.startIcon && <span className="flex items-center">{props.startIcon}</span>}
      <span className="font-semibold">{props.title}</span>
      {props.endIcon && <span className="flex items-center">{props.endIcon}</span>}
    </button>
  );
};