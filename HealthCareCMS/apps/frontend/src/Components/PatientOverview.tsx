import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "./Inputs/Button";
import { useState, useEffect } from "react";
import { usePrescriptions } from "../hooks/usePrescriptions";
import { Loader } from "./LoaderSckelton";

type PatientDetails = {
  newPatient: {
    fullName: string;
    number: string;
    birth: string;
    dob: string;
  };
};

type Prescription = {
  _id: string;
  doctorName: string;
  date: string;
  patientId: string;
};

const formatFullName = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const formatDate = (dob: string) => {
  if (!dob) return "";
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  return `${age} Years`;
};

export const PatientOverview = () => {
  const { patientId = "", doctorId = "" } = useParams();
  console.log(doctorId)
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null);
  const [doctorName, setDoctorName] = useState<string>("");
  const [refresh, setRefresh] = useState(true);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  // Fetch doctor name
  useEffect(() => {
    const getDoctorName = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}cms/v1/doctor/prescription/doctor/${doctorId}`);
        setDoctorName(response.data.name);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };
    if (doctorId) {
      getDoctorName();
    }
  }, [doctorId]);

  // Fetch patient details
  useEffect(() => {
    const getPatientDetails = async () => {
      setLoader(true);
      try {
        const response = await axios.get(`${BACKEND_URL}cms/v1/doctor/patientdetails/${patientId}`);
        setPatientDetails(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      } finally {
        setLoader(false);
      }
    };

    if (patientId) {
      getPatientDetails();
    }
  }, [patientId, refresh]);

  const { prescriptions, loading: prescriptionsLoading } = usePrescriptions({ patientId, refresh });

  const handleAddPrescription = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}cms/v1/doctor/prescription/presId`, {
        patientId,
        doctorName
      });
      
      if (response.data.response._id) {
        navigate(`/cms/v1/doctor/patient/prescription/${response.data.response._id}`);
      } else {
        console.error("No prescription ID received");
      }
    } catch (error) {
      console.error("Error adding prescription:", error);
    }
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-full max-w-[1390px] min-h-[650px] shadow-xl rounded-xl border border-slate-300 m-7 p-6 md:min-w-[768px] sm:min-w-full">
      {patientDetails && (
        <div className="flex justify-between items-center w-full mb-4">
          <div className="text-xl font-semibold">
            <span>{formatFullName(patientDetails.newPatient.fullName)}{" "}</span>
            <span className="text-gray-500 text-lg">
              ({formatDate(patientDetails.newPatient.dob)})
            </span>
          </div>

          <Button
            title="Add Prescription"
            size="md"
            variant="secondary"
            onClick={handleAddPrescription}
          />
        </div>
      )}

      <hr className="border-t border-gray-300" />

      <div>
        {prescriptionsLoading ? (
          <Loader />
        ) : (
          <div>
            {prescriptions.map((prescription: Prescription) => (
              <div 
                key={prescription._id} 
                className="border flex justify-between items-center border-gray-300 rounded-md p-4 m-2"
              >
                <div>
                  <div className="font-medium">{prescription.doctorName}</div>
                  <p className="text-gray-500 text-sm">
                    {prescription.date ? new Date(prescription.date).toLocaleDateString() : "No date"}
                  </p>
                </div>
                <div className="flex justify-end items-center">
                  <Button 
                    variant="secondary" 
                    size="md" 
                    title="View Prescription"
                    onClick={() => {
                      navigate(`/cms/v1/doctor/patient/prescription/${prescription._id}`);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};