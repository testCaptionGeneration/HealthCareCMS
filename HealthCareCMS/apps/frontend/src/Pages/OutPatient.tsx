import { useEffect, useState } from "react";
import { PageWrapper } from "../Wrapper/PageWrapper";
import { Button } from "../Components/Inputs/Button";
import { BACKEND_URL } from "../config";
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

export const OutPatientPage = () => {
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
    <PageWrapper>
      <div className="p-6 max-w-6xl mx-auto border border-slate-300 m-3 min-w-[1380px] rounded-2xl shadow-xl">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Out Patients</h1>
            <p className="text-gray-500 italic">
              Below is the list of recently visited patients.
            </p>
          </div>
          <Button
            size="md"
            variant="secondary"
            title="Back to Dashboard"
            onClick={() => navigate(`/cms/v1/doctor/dashboard/${doctorId}`)}
          />
        </div>

        <div className="overflow-x-auto overflow-y-scroll">
          <div className="bg-[#3B9AB8] text-white w-full min-w-[750px] h-12 rounded-2xl shadow-md border-2 border-white mt-6 flex items-center px-6 font-semibold">
            <div className="grid grid-cols-3 w-full text-center">
              <div className="p-2">Patient</div>
              <div className="p-2">Doctor</div>
              <div className="p-2">Prescription</div>
            </div>
          </div>

          <div className="mt-4 border border-gray-300 rounded-lg shadow-md min-w-[750px]">
            {loading ? (
              <p className="text-center text-gray-500 p-4 italic">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500 p-4 italic">{error}</p>
            ) : outPatients.length > 0 ? (
              outPatients.map((patient, index) => (
                <div
                  key={patient._id}
                  className={`grid grid-cols-3 text-center p-4 border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="p-2 font-medium">{patient.patientName}</div>
                  <div className="p-2 text-gray-700">{patient.doctorName}</div>
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
      </div>
    </PageWrapper>
  );
};
