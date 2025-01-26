import { Ref } from "react";

export const Input = ({
  placeholder,
  type,
  refrence,
  size = "medium", 
}: {
  placeholder: string;
  type: string;
  refrence?: Ref<HTMLInputElement>;
  size?: "small" | "medium" | "large"; 
}) => {
  
  const sizeClass =
    size === "small" ? "w-32" : size === "large" ? "w-64" : "w-48";

  return (
    <div className="flex justify-center">
      <input
        ref={refrence}
        type={type}
        placeholder={placeholder}
        className={`${sizeClass} px-4 py-2 m-3 shadow-md rounded-md`}
      />
    </div>
  );
};
