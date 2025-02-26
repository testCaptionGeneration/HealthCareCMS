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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { DoctorId = "" } = useParams();
  const doctorId = DoctorId;
  const navigate = useNavigate();

  useEffect(() => {
    if (!doctorId) {
      setError("Invalid Doctor ID.");
      setLoading(false);
      return;
    }

    const fetchOutPatients = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}cms/v1/doctor/prescription/doctor/${doctorId}`
        );

        if (response.data.response && Array.isArray(response.data.response)) {
          const sortedData = response.data.response.sort(
            (a: OutPatientData, b: OutPatientData) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setOutPatients(sortedData);
        } else {
          setOutPatients([]);
        }
      } catch (error) {
        console.error("Error fetching outpatients:", error);
        setError("Failed to fetch outpatients.");
      } finally {
        setLoading(false);
      }
    };

    fetchOutPatients();
  }, [doctorId]);

  return (
    <DashboardCard>
      <div className="p-4 h-[350px]">
        <div className="flex items-center justify-between font-semibold">
          <div >
          <div className="text-xl font-bold">Out Patients</div>
          <div className="text-sm ml-1 text-gray-500 italic font-normal">Below are the three most recently visited patients.</div>
          </div>
          <Button size="md" variant="secondary" title="View All" onClick={()=> navigate(`/cms/v1/doctor/dashboard/outpatients/${doctorId}`)} />
        </div>

        <div className="bg-[#3B9AB8] w-full h-12 rounded-2xl shadow-md border-2 border-white mt-4 f lex items-center">
          <div className="grid grid-cols-2 w-full px-6 text-white text-center font-semibold">
            <div className="p-2">Patient</div>
            <div className="p-2">Prescription</div>
          </div>
        </div>

        <div className="max-h-64 overflow-y-hidden h-[222px] mt-6 border border-gray-300 rounded-lg">
          {loading ? (
            <p className="text-center text-gray-500 p-4 italic">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500 p-4 italic">{error}</p>
          ) : outPatients.length > 0 ? (
            outPatients.map((patient, index) => (
              <div
                key={patient._id}
                className={`grid grid-cols-2 text-center gap-6 p-3 text-gray-600 border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className="p-2 ml-5 font-medium">{patient.patientName}</div>

                <div className="p-2 flex justify-center">
                  <Button
                    variant="secondary"
                    size="md"
                    title="View"
                    onClick={() =>
                      navigate(
                        `/cms/v1/doctor/patient/pastPrescription/${patient._id}/${patient.patientId}`
                      )
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 p-4 italic">
              No outpatients found.
            </p>
          )}
        </div>
      </div>
    </DashboardCard>
  );
};
