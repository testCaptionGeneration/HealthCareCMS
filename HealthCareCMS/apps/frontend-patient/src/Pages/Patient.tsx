import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";
import { Button } from "../Components/Button";

// Define TypeScript types using zod
export const PatientSchema = z.object({
  _id: z.string(),
  fullName: z.string(),
  phone: z.string(),
  email: z.string(),
  password: z.string(),
  hospital: z.string(),
});

export type PatientType = z.infer<typeof PatientSchema>;

const Patient: React.FC = () => {
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
 const navigate=useNavigate();
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const phone = params.get("temp");
        const response = await axios.get<PatientType[]>(
          `http://localhost:3000/api/patients/profile/${phone}`
        );
        setPatients(response.data);
      } catch (err) {
        setError("Failed to fetch patients.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);



  const handleClick=(id:string)=>{
    console.log("click hua")
 navigate(`patient-dashboard/?temp=${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Patients Directory
        </h2>

        {loading && (
          <div className="text-center text-gray-500 text-lg">Loading...</div>
        )}
        {error && (
          <div className="text-center text-red-500 text-lg font-medium">
            {error}
          </div>
        )}

        <div
          className={`grid gap-6 ${
            patients.length === 1
              ? "grid-cols-1"
              : patients.length <= 3
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          {patients.map((patient) => (
            <div
              key={patient._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-2 border-[#3B9AB8] "
              onClick={()=>handleClick(patient._id)}
            >
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-3xl font-semibold shadow-md">
                  {patient.fullName.charAt(0)}
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-800">
                  {patient.fullName}
                </h3>
                <p className="text-md text-gray-500">{patient.hospital}</p>
              </div>

              {/* <button  onClick={() => handleClick(patient._id)} className="w-full bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg ">
                View Profile
              </button> */}
              <div className="flex justify-center">
              
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patient;
