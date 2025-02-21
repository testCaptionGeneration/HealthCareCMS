import { ReactNode } from "react";

export const CardWrapper = ({ children, size }: { children: ReactNode, size?:number }) => {
  return (
    <div
      className={`
        relative 
        w-full 
        max-w-[670px] 
        h-auto 
        bg-white

        md:h-[325px]
        lg:w-[670px] 
        md:w-[500px] 
        xs:h-[200px]
        xs:w-[400px] 
        m-3 
        shadow-md 
        rounded-2xl 
         
        
      `}
    >
      {children}
    </div>
  );
};
