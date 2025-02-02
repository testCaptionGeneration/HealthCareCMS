export const CheckBox=({name,id,title}:{name:string, id:string, title:string})=>{
    return <div className="px-4 py-2 flex items-center">
        <input type="checkbox" id={id} name={name} value={name} className="m-1" />
        <label htmlFor={id}>{title}</label>
    </div>
}