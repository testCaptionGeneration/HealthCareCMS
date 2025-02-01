
import React from "react";
import {useState,useEffect} from "react"
import axios from"axios"
import {z} from 'zod'

export const PatientType=z.object({
  
})



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


export type PatientType=PatientType


  const Patient: React.FC = () => {

   const [pateint,setPatient]=useState<<Array<PatientType>({});

   co






    return (
      <>
        <div className="mx-6 my-6 min-h-screen">
          <div className="flex flex-col gap-4 w-full bg-white rounded-[31px] shadow-lg border border-white p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor, index) => (
                <div 
                  key={index}
                  className="flex-col justify-center bg-white rounded-[14px] shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex   h-40 w-full max-w-[300px]"
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
                  <button className="bg-[#3a99b7] text-white text-sm font-medium 
                  my-3 py-2 px-4 rounded mx-auto  hover:bg-blue-600">
               click
            </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Patient;
  