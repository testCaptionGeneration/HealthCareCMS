import React from "react";
import { Button } from "./Button";

interface Doctor {
  name: string;
  specialty: string;
  experience: string;
  availability: string;
  buttonText: string;
}

const doctors: Doctor[] = [
  {
    name: "Amanda Clara",
    specialty: "Pediatrics",
    experience: "12 years experience",
    availability: "Tue, Thu 10:00 AM - 01:00 PM",
    buttonText: "Chat with Doctor",
  },
  {
    name: "Jason Shatsky",
    specialty: "Surgical",
    experience: "10 years experience",
    availability: "Tue, Thu 10:00 AM - 01:00 PM",
    buttonText: "Book an appointment",
  },
  {
    name: "Jessie Dux",
    specialty: "Gastroenterology",
    experience: "7 years experience",
    availability: "Tue, Thu 10:00 AM - 01:00 PM",
    buttonText: "Book an appointment",
  },
];

const Medication: React.FC = () => {
  return (
    <div className="mx-6">
      
        <h2 className="text-xl font-semibold">My Recent Healthcare Visits</h2>
        
      
  
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className=" bg-white rounded-[14px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.25)] m-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <h3 className="text-lg font-medium">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <p className="text-sm text-gray-600">{doctor.experience}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">{doctor.availability}</p>
            
            <Button title="chat with doctor" size="md" variant="secondary"/>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default Medication;
