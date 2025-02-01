interface Medication {
    name: string;
    specialty: string;
    experience: string;
    buttonText: string;
  }
  
  const medications: Medication[] = [
    {
      name: "Amanda Clara",
      specialty: "Specialist",
      experience: "12 years experience",
      buttonText: "Prescription",
    },
    {
      name: "Jason Shatsky",
      specialty: "Specialist",
      experience: "10 years experience",
      buttonText: "Prescription",
    },
    {
      name: "Jason Shatsky",
      specialty: "Specialist",
      experience: "10 years experience",
      buttonText: "Prescription",
    },{
      name: "Jason Shatsky",
      specialty: "Specialist",
      experience: "10 years experience",
      buttonText: "Prescription",
    },
  ];

const Upper:React.FC=()=>{
   return (
    <div className="mx-6 mb-10">
      <h2 className="text-xl font-semibold mb-4">Ongoing Medication List</h2>
        <div className="flex-col gap-4  w-full h-[311px] bg-white rounded-[31px] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.25)] border border-white" >
      
      <div className="space-y-4  ">
        {medications.map((medication, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white rounded-[14px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.25)] m-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <h3 className="text-lg font-medium">{medication.name}</h3>
                <p className="text-sm text-gray-600">{medication.specialty}</p>
                <p className="text-sm text-gray-600">{medication.experience}</p>
              </div>
            </div>
            <button className="bg-[#3a99b7] text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-600">
              {medication.buttonText}
            </button>
          </div>
        ))}
        <div className="flex justify-center items-center  md-4">
      <button className=" mx-auto bg-[#3a99b7] text-white text-sm font-medium h-6 px-8 rounded hover:bg-blue-600 ">
        View
      </button>
      </div>
      </div>
      
      
      </div>
    </div>
  );
}

export default Upper;