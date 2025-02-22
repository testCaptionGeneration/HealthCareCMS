import { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import axios from "axios";

import { Button } from "../Components/Inputs/Button";
import { PageWrapper } from "../Wrapper/PageWrapper";
import { CreatePrescription } from "../Creation/CreatePrescription";
import { Loader } from "../Components/LoaderSckelton";

import { BACKEND_URL } from "../config";
import { useMedicines } from "../hooks/useMedicines";

import { AddIcon } from "../Icons/AddIcon";
import { CloseIcon } from "../Icons/CloseIcon";

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
    const { prescriptionId } = useParams<{ prescriptionId: string }>();
    const [prescriptionMedication, setPrescriptionMedication] = useState(false);
    const [patientDetails, setPatientDetails] = useState<PatientDetailsResponse | null>(null);
    const [loader, setLoader] = useState(true);
    const [refresh, setRefresh] = useState(true);
    const [content,setContent]=useState<string>('');

    useEffect(() => {
        const fetchDetails = async () => {
            if (!prescriptionId) return;

            setLoader(true);
            try {
                const response = await axios.get(`${BACKEND_URL}cms/v1/doctor/prescription/${prescriptionId}`);
                const patientId = response.data.response.patientId;
                const res = await axios.get<PatientDetailsResponse>(`${BACKEND_URL}cms/v1/doctor/patientdetails/${patientId}`);
                setPatientDetails(res.data);
            } catch (error) {
                console.error("Error fetching patient details:", error);
            } finally {
                setLoader(false);
            }
        };

        fetchDetails();

        const handleMedicineUpdate = () => setRefresh((prev) => !prev);
        window.addEventListener("medicineUpdated", handleMedicineUpdate);
        return () => window.removeEventListener("medicineUpdated", handleMedicineUpdate);
    }, [prescriptionId, refresh]);

    const deleteMedicine = async (medicineId: string) => {
        try {
            await axios.delete(`${BACKEND_URL}cms/v1/doctor/medication/${medicineId}`);
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error("Error deleting medicine:", error);
        }
    };

    const { medication, isLoading } = useMedicines({ prescriptionId: prescriptionId || "", refresh });

    return (
        <PageWrapper>
            <div className="flex justify-center items-center mt-5 px-4  ">
                <div className="relative overflow-y-scroll w-[1390px] h-[600px] p-2 rounded-lg border border-slate-200 shadow-md overflow-hidden bg-white">
                    <CreatePrescription open={prescriptionMedication} setOpen={setPrescriptionMedication} />

                    <div className="p-6 border-2 border-[#3B9AB8] rounded-2xl ">
                        {loader ? (
                            <Loader />
                        ) : (
                            <strong className="text-lg uppercase">
                                {patientDetails?.newPatient.fullName},{" "}
                                <span className="text-gray-500 text-sm">
                                    ({formatDate(patientDetails?.newPatient.dob ?? "")})
                                </span>
                            </strong>
                        )}
                    </div>

                    <div className="p-6 border-2 border-[#3B9AB8] rounded-xl shadow-lg mt-4 bg-gray-50">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Treatment Plan & Advice</h3>
                        <textarea
                            className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B9AB8]"
                            rows={4}
                            placeholder="Enter treatment advice and recommendations..."
                            onChange={(e)=>setContent(e.target.value)}
                        />
                    </div>

                    <div className="p-6 border-2 border-[#3B9AB8] rounded-xl shadow-lg mt-4">
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

                        <div className="max-h-85 overflow-y-auto overflow-x-auto">
                            <div className="min-w-max w-full">
                                <div className="grid grid-cols-6 bg-gray-200 p-3 font-semibold text-gray-700 text-center rounded-t-lg">
                                    <div className="p-2">Medication</div>
                                    <div className="p-2">Dose</div>
                                    <div className="p-2">Frequency</div>
                                    <div className="p-2">Duration</div>
                                    <div className="p-2">Meal Timing</div>
                                    <div className="p-2">Action</div>
                                </div>

                                {isLoading ? (
                                    <Loader className="mx-7 my-7" />
                                ) : medication?.length > 0 ? (
                                    medication.map((med: any, index: number) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-6 text-center p-3 text-gray-600 border-b odd:bg-gray-50 even:bg-white items-center"
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
                </div>
            </div>

            <div className="flex justify-center p-3">
                <Button variant="primary" title="Submit" size="md" onClick={()=>{
                    axios.post(`${BACKEND_URL}cms/v1/doctor/treatmentcontent`,{
                        prescriptionId:prescriptionId,
                        content
                    }).then(()=>alert("Prescription submitted successfully")).catch(()=>alert("Error in submitting prescription"));
                }}/>
            </div>
        </PageWrapper>
    );
};
