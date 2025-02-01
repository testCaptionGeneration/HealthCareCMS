
import React from "react";

interface Doctor {
  name: string;
  specialty: string;
  experience: string;
  availability: string;
  buttonText: string;
  age: number;
}

const doctors: Doctor[] = [
    {
      name: "Amanda Clara",
      specialty: "Pediatrics",
      experience: "12 years experience",
      availability: "Tue, Thu 10:00 AM - 01:00 PM",
      buttonText: "Chat with Doctor",
      age:56,
    },
    {
      name: "Jason Shatsky",
      specialty: "Surgical",
      experience: "10 years experience",
      availability: "Tue, Thu 10:00 AM - 01:00 PM",
      buttonText: "Book an appointment",
      age:32,
    },
    {
      name: "Jessie Dux",
      specialty: "Gastroenterology",
      experience: "7 years experience",
      availability: "Tue, Thu 10:00 AM - 01:00 PM",
      buttonText: "Book an appointment",
      age:45,
    },
  ];





  const Patient: React.FC = () => {
    return (
      <>
        <div className="mx-6 my-6 min-h-screen">
          <div className="flex flex-col gap-4 w-full bg-white rounded-[31px] shadow-lg border border-white p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[14px] shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col items-start h-40 w-full max-w-[300px]"
                >
                  <div className="flex items-center space-x-4 w-full">
                    <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white text-lg font-bold">
                      M
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold">{doctor.name}</h1>
                      <h3 className="text-sm text-gray-600">{doctor.age} years</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Patient;
  