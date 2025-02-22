import { useEffect, useState } from "react";
import { DashboardCard } from "../../Wrapper/DashboardCardWrapper";
import { Button } from "../Inputs/Button";
import { BACKEND_URL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
 

interface OutPatientData {
  _id: string;
  patientName: string;
  doctorName: string;
  doctorId: string;
  patientId: string;
  date: string;
}

export const OutPatient = () => {
  const [outPatients, setOutPatients] = useState<OutPatientData[]>([]);
  const { DoctorId = "" } = useParams();
  const doctorId = DoctorId;
  const navigate=useNavigate();
  console.log(doctorId);
  useEffect(() => {
    const fetchOutPatients = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}cms/v1/doctor/prescription/doctor/${doctorId}`);
        setOutPatients(response.data.response || []);
        console.log(response.data.response);
        
      } catch (error) {
        console.error("Error fetching outpatients:", error);
      }
    };

    fetchOutPatients();
  }, [doctorId]);

  return (
    <DashboardCard>
      <div className="p-4">
        <div className="flex items-center justify-between font-semibold">
          <span className="text-xl">Out Patients</span>
          <Button size="md" variant="secondary" title="View All" />
        </div>

        {/* Header Row */}
        <div className="bg-[#3B9AB8] w-full h-12 rounded-2xl shadow-md border-2 border-white mt-4 flex justify-center items-center">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 w-full px-4 text-white text-center">
            <div className="p-1">Patient</div>
            <div className="p-1">Prescription</div>
          </div>
        </div>

        {/* Patient Data */}
        <div className="max-h-64 overflow-y-auto mt-2">
        {outPatients.length > 0 ? (
  outPatients.map((patient) => (
    <div
      key={patient._id}
      className="grid grid-cols-2 text-center gap-6 p-3 text-gray-600 border-b odd:bg-gray-50 even:bg-white"
    >
      <div className="p-2 font-medium">{patient.patientName}</div>
      <div className="p-2">
        <Button
          variant="secondary"
          size="sm"
          title="View"
          onClick={() => navigate(`/cms/v1/doctor/patient/pastPrescription/${patient._id}/${patient.patientId}`)}
        />
      </div>
    </div>
  ))
) : (
  <p className="text-center text-gray-500 p-4 italic">No outpatients found.</p>
)}

        </div>
      </div>
    </DashboardCard>
  );
};
