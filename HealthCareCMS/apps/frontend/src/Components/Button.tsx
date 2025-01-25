import { ReactElement } from "react"

interface ButtonInterface{
    size:"lg"|"sm"|"md",
    startIcon?:ReactElement,
    endIcon?:ReactElement,
    title:string,
    variant : "primary" | "secondary"
}

const sizeStyle={
    "lg": "px-12 py-4 text-xl rounded-xl hover:bg-[#47B3D5]",
    "md": "px-10 py-2 text-md rounded-md hover:bg-[#47B3D5]",
    "sm": "px-8 py-1 text-sm rounded-sm hover:bg-[#47B3D5]",
}

const variantStyles={
    "primary":"bg-[#3B9AB8] shadow-md",
    "secondary":"bg-[#C8E2EA] shadow-md"
}

export const Button=(props:ButtonInterface)=>{
    return <div>
        <button className={sizeStyle[props.size]+" "+ variantStyles[props.variant]+" cursor-pointer"}>
            <div className="flex items-center justify-center">
                <div className="mr-2">{props.startIcon}</div>
                <div>{props.title}</div>
                <div>{props.endIcon}</div>
            </div>
        </button>
    </div> 
        
}