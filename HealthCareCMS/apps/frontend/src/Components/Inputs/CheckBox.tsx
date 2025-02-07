import React, { Ref } from "react"

export const CheckBox = ({ name, id, title, refrence, onChange }: { name: string, id: string, title: string, refrence?: Ref<HTMLInputElement>, onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return <div className="px-4 py-2 flex items-center">
        <input ref={refrence} type="checkbox" id={id} name={name} value={name} className="m-1" onChange={onChange} />
        <label htmlFor={id}>{title}</label>
    </div>
}