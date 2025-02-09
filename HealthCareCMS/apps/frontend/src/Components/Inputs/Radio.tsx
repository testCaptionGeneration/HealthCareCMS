export const Radio =({name,value,title}:{name:string,value:string,title:String})=>{
    return <div className="space-y-2 rounded-lg">
    <div className="flex items-center gap-2 p-1">
      <input type="radio" id={value} name={name} value={value} />
      <label htmlFor={value}>{title}</label>
    </div>
    </div>
}