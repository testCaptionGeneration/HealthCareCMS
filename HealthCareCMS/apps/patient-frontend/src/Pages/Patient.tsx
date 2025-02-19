import React, { useState, useEffect } from "react";
import axios from "axios";
import { z } from "zod";

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

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get<PatientType[]>("http://localhost:5000/api/patients/pt");
        setPatients(response.data);
      } catch (err) {
        setError("Failed to fetch patients.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="mx-6 my-6 min-h-screen">
      <div className="flex flex-col gap-4 w-full bg-white rounded-[31px] shadow-lg border border-white p-6">
        <h2 className="text-xl font-bold mb-4">Patients List</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <div
              key={patient._id}
              className="flex-col justify-center bg-white rounded-[14px] shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex h-40 w-full max-w-[300px]"
            >
              <div className="flex items-center space-x-4 w-full">
                <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white text-lg font-bold">
                  {patient.fullName.charAt(0)}
                </div>
                <div>
                  <h1 className="text-lg font-semibold">{patient.fullName}</h1>
                  <h3 className="text-sm text-gray-600">{patient.hospital}</h3>
                </div>
              </div>
              <button className="bg-[#3a99b7] text-white text-sm font-medium my-3 py-2 px-4 rounded mx-auto hover:bg-blue-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patient;
