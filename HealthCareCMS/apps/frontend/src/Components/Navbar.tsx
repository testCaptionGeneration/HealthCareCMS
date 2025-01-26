






const Navbar:React.FC=()=>{
    return <div>
      <div className="flex justify-between  mx-6 p-3 bg-white rounded-[14px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.25)] m-4 hover:shadow-md transition-shadow duration-200"> 
        
          <div className="flex">
          <div className="m-2" >
            logo
          </div>
               <div className="text-[#3a99b7] m-2">
                   HealthCareCMS
               </div>
             
           </div> 

     

      
          <div className="  h-full justify-start items-start gap-2.5 inline-flex ">
          <div className="px-5 py-2 bg-white  justify-center items-center flex">
            <div className="text-[#3a99b7] inline-flex text-base font-medium font-['Inter'] leading-[18px]">Past Appointments </div>
             </div>

               
              
              
            
          </div>

     
      </div>  
    </div>
}


export default Navbar;