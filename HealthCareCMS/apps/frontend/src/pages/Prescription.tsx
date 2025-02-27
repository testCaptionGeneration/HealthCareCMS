import axios from "axios";
import { Button } from "../Components/Inputs/Button";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreatePrescription } from "../Creation/CreatePrescription";
import { AddIcon } from "../Icons/AddIcon";
import { useMedicines } from "../hooks/useMedicines";
import { CloseIcon } from "../Icons/CloseIcon";
import { Loader } from "../Components/LoaderSckelton";
import { AddDiseasePopup } from "../Components/Inputs/AddDiseasePopup";
import { NavbarComponent } from "../Components/NavbarComponent";

interface Patient {
    fullName: string;
    phone: string;
    dob: string;
}

interface PatientDetailsResponse {
    newPatient: Patient;
}

const formatDate = (dob: string) => {
    if (!dob) return "";
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    return `${age} Years Old`;
};

export const PrescriptionComponent = () => {
    const [prescriptionMedication, setPrescriptionMedication] = useState(false);
    const [diseasePopupOpen, setDiseasePopupOpen] = useState(false);
    const [patientDetails, setPatientDetails] = useState<PatientDetailsResponse | null>(null);
    const [loader, setLoader] = useState(true);
    const { prescriptionId } = useParams<{ prescriptionId: string }>();
    const [refresh, setRefresh] = useState(true);
    const [content, setContent] = useState<string>("");
    const [doctorId,setDoctorId]=useState("");
    const [disease,setDisease]=useState([]);

    useEffect(() => {
        console.log(prescriptionId);
        const fetchDetails = async () => {
            setLoader(true);
            try {
                if (!prescriptionId) return;
                const response = await axios.get(`${BACKEND_URL}cms/v1/doctor/prescription/${prescriptionId}`);
                console.log(response.data.response.patientId);
                const res = await axios.get<PatientDetailsResponse>(
                    `${BACKEND_URL}cms/v1/doctor/patientdetails/${response.data.response.patientId}`
                );
                setPatientDetails(res.data);
            } catch (error) {
                console.error("An error occurred:", error);
            }
            setLoader(false);
        };

        fetchDetails();

        const fetchDoctorId=async ()=>{
            const response=await axios.get(`${BACKEND_URL}cms/v1/doctor/prescription/${prescriptionId}`);

            setDoctorId(response.data.response.doctorId);
        }
        fetchDoctorId();

        

        const handleMedicineUpdate = () => setRefresh((prev) => !prev);
        window.addEventListener("medicineUpdated", handleMedicineUpdate);
        return () => window.removeEventListener("medicineUpdated", handleMedicineUpdate);
    }, [prescriptionId, refresh]);


    const fetchDiseases=async ()=>{
        const response= await axios.get(`${BACKEND_URL}cms/v1/doctor/prescription/diseases/${prescriptionId}`);
        setDisease(response.data.disease);
        console.log(disease);
    }

    fetchDiseases();

    const deleteMedicine = async (medicineId: string) => {
        try {
            await axios.delete(`${BACKEND_URL}cms/v1/doctor/medication/${medicineId}`);
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error("Error deleting medicine:", error);
        }
    };  

    const { medication, isLoading } = useMedicines({
        prescriptionId: prescriptionId || "",
        refresh,
    });

    return (
        <div>
        <NavbarComponent DoctorId={doctorId}/>
            <div className="flex justify-center items-start mt-5 px-4">
                <div className="relative w-[1350px] h-auto p-4 rounded-lg border border-gray-300 shadow-lg bg-white">
                    <CreatePrescription open={prescriptionMedication} setOpen={setPrescriptionMedication} />
                    <AddDiseasePopup open={diseasePopupOpen} setOpen={setDiseasePopupOpen} />

                    {/* Patient Info Section */}
                    <div className="p-6 border-2 border-[#3B9AB8] rounded-2xl flex justify-between items-center shadow-sm">
                        {loader ? (
                            <Loader />
                        ) : (
                            <div className="text-lg font-semibold">
                                <i>
                                    {patientDetails?.newPatient.fullName},{" "}
                                    <span className="text-gray-500 text-sm">
                                        ({formatDate(patientDetails?.newPatient.dob ?? "")})
                                    </span>
                                    <div>{disease.map((disease,i,arr)=>(<span key={i}>{`${disease}${i!=arr.length-1?", ":"."}`}</span>))}</div>
                                </i>
                            </div>
                        )}

                        <Button
                            startIcon={<AddIcon size={20} />}
                            size="md"
                            variant="secondary"
                            title="Add Disease"
                            onClick={() => setDiseasePopupOpen(true)}
                        />
                    </div>

                    {/* Medication List Section */}
                    <div className="p-6 border-2 border-[#3B9AB8] rounded-xl shadow-lg mt-6">
                        <div className="flex justify-between items-center border-b-2 border-[#3B9AB8] pb-2 mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Prescribed Medications</h3>
                            <Button
                                startIcon={<AddIcon size={20} />}
                                size="md"
                                variant="secondary"
                                title="Add Medicine"
                                onClick={() => setPrescriptionMedication(true)}
                            />
                        </div>

                        <div className="max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                            <div className="min-w-full">
                                <div className="grid grid-cols-6 bg-gray-200 p-3 font-semibold text-gray-700 text-center rounded-t-lg">
                                    <div className="p-2">Medication</div>
                                    <div className="p-2">Dose</div>
                                    <div className="p-2">Frequency</div>
                                    <div className="p-2">Duration</div>
                                    <div className="p-2">Meal Timing</div>
                                    <div className="p-2">Actions</div>
                                </div>

                                {isLoading ? (
                                    <Loader className="mx-auto my-7" />
                                ) : medication?.length > 0 ? (
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    medication.map((med:any, index) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-6 text-center p-3 text-gray-600 border-b odd:bg-gray-50 even:bg-white"
                                        >
                                            <div className="p-2 font-medium">{med.medication}</div>
                                            <div className="p-2">{med.dose} {med.doseUnit}</div>
                                            <div className="p-2">{med.morning ? "|" : "0"} - {med.afternoon ? "|" : "0"} - {med.evening ? "|" : "0"}</div>
                                            <div className="p-2">{med.duration} {med.durationUnit}</div>
                                            <div className="p-2">{med.mealStatus === "aftermeal" ? "After Meal" : "Before Meal"}</div>
                                            <div className="p-2 flex justify-center items-center">
                                                <Button
                                                    title="Delete"
                                                    startIcon={<CloseIcon size={28.85} />}
                                                    variant="secondary"
                                                    size="md"
                                                    onClick={() => deleteMedicine(med._id)}
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 p-4 italic">No prescribed medications available.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Treatment Advice Section */}
                    <div className="p-6 border-2 border-[#3B9AB8] rounded-xl shadow-lg mt-6 bg-gray-50">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Treatment Plan & Advice</h3>
                        <textarea
                            className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B9AB8]"
                            rows={4}
                            placeholder="Enter treatment advice and recommendations..."
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center p-3">
                    <Button
  variant="primary"
  title="Submit"
  size="md"
  onClick={async () => {
    try {
      alert("Prescription submitted!");
      await axios.post(`${BACKEND_URL}cms/v1/doctor/treatmentcontent`, {
        prescriptionId,
        content,
      });
      window.history.go(-1); 
    } catch (error) {
      console.error("Error submitting prescription:", error);
      alert("Failed to submit prescription. Please try again.");
    }
  }}
/>

                    </div>
                </div>
            </div>
            </div>
    );
};