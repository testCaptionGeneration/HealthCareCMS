import { Ref } from "react";

interface TextareaInterface {
  placeholder: string;
  size?: "small" | "medium" | "large"; 
  refrence?: Ref<HTMLTextAreaElement>;
}

export const Textarea = ({
  placeholder,
  size = "medium",
  refrence,
}: TextareaInterface) => {
  // Define size classes based on the `size` prop
  const sizeClass =
    size === "small" ? "w-32" : size === "large" ? "w-64" : "w-48";

  return (
    <div className="flex justify-center">
      <textarea
        ref={refrence}
        placeholder={placeholder}
        className={`${sizeClass} px-4 py-2 m-3 shadow-md rounded-md`}
      />
    </div>
  );
};
