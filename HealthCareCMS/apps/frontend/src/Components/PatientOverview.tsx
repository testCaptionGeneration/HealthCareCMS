import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "./Inputs/Button";
import { useState, useEffect } from "react";
import { usePrescriptions } from "../hooks/usePrescriptions";
import { Loader } from "./LoaderSckelton";
import { AddPrescriptionPopUp } from "./PopUps/AddPrescriptionPopUp";


type PatientDetails = {
  newPatient: {
    fullName: string;
    number: string;
    dob: string;
  };
};

type Prescription = {
  _id: string;
  doctorName: string;
  
  patientId: string;
  date?: string; 
};

const formatFullName = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const formatDate = (dob: string) => {
  if (!dob) return "Unknown Age";
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  return `${age} Years`;
};

export const PatientOverview = () => {
  const { patientId = "",doctorId = "" } = useParams();
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null);
  const [doctorName, setDoctorName] = useState<string>("");
  const [refresh, setRefresh] = useState(true);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
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

  const { prescriptions = [], loading: prescriptionsLoading } = usePrescriptions({ patientId, refresh });

  const sortedPrescriptions = [...prescriptions].sort((a: Prescription, b: Prescription) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0; 
    const dateB = b.date ? new Date(b.date).getTime() : 0;

    if (dateB !== dateA) {
      return dateB - dateA; 
    }

    const timeA = a.date ? new Date(a.date).getHours() * 60 + new Date(a.date).getMinutes() : 0;
    const timeB = b.date ? new Date(b.date).getHours() * 60 + new Date(b.date).getMinutes() : 0;

    return timeB - timeA;
  });

  
  if (loader) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-full max-w-[1390px] min-h-[650px] shadow-xl rounded-xl border border-slate-300 m-7 p-6 md:min-w-[768px] sm:min-w-full">
      <AddPrescriptionPopUp open={open} setOpen={setOpen} />
      
      {patientDetails && (
        <div className="flex justify-between items-center w-full mb-4">
          <div className="text-2xl font-semibold">
            <span className="font-bold">{formatFullName(patientDetails.newPatient.fullName)}{" "}</span>
            <span className="text-gray-500 text-lg">({formatDate(patientDetails.newPatient.dob)})</span>
          </div>

          <Button
            title="Add Prescription"
            size="md"
            variant="secondary"
            onClick={()=>setOpen(true)}
          />
        </div>
      )}
      <hr className="border-t border-gray-300" />
      <div className="mt-3 mx-2">
        <div className="text-lg font-bold text-gray-600">Previous Prescriptions Record</div>
        <span className="text-sm text-gray-500 italic">
          The patient's past prescriptions will be displayed here for reference and continuity of care.
        </span>
      </div>

      <div className="h-[550px] overflow-y-scroll mt-2 border p-4 border-gray-300 rounded-2xl">
        {prescriptionsLoading ? (
          <Loader />
        ) : sortedPrescriptions.length > 0 ? (
          sortedPrescriptions.map((prescription: Prescription) => (
            <div key={prescription._id} className="border flex justify-between items-center border-gray-300 rounded-md p-4 m-2">
              <div>
                <span className="font-semibold">{prescription.doctorName}</span>
                <p className="text-gray-500 text-sm italic">
                  {prescription.date ? prescription.date.replace("T", " ").split(".")[0] : "No Date Available"}
                </p>
              </div>
              <div className="flex justify-end items-center">
                <Button
                  variant="secondary"
                  size="md"
                  title="View Prescription"
                  onClick={() =>
                    navigate(`/cms/v1/doctor/patient/pastPrescription/${prescription._id}/${patientId}`)
                  }
                />
              </div>
            </div>
          ))
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