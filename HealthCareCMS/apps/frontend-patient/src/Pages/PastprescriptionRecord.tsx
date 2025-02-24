import { useParams } from "react-router-dom";
import { PageWrapper } from "../Wrapper/PageWrapper";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useEffect, useState } from "react";
import { usefetchMedicine } from "../hooks/usefetchMedicine";
import { Loader } from "../Components/Loader";

interface Patient {
    fullName: string;
}

interface PatientDetailsResponse {
    newPatient: Patient;
}

export const PastprescriptionRecord= () => {
    const { prescriptionId, patientId } = useParams<{ prescriptionId: string; patientId: string }>();
    const [patientDetails, setPatientDetails] = useState<PatientDetailsResponse | null>(null);
    const { medication, isLoading } = usefetchMedicine({ prescriptionId: prescriptionId || "" });
    const [treatmentAdvice, setTreatmentAdvice] = useState<string | null>(null);

    useEffect(() => {
        const getPatientDetails = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}cms/v1/doctor/patientdetails/${patientId}`);
                setPatientDetails(response.data);
            } catch (error) {
                console.error("Error fetching patient details:", error);
            }
        };

        const getTreatmentContent = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}cms/v1/doctor/treatment/${prescriptionId}`);
                setTreatmentAdvice(response.data?.treatment?.content || "No treatment advice available.");
            } catch (error) {
                console.error("Error fetching treatment advice:", error);
                setTreatmentAdvice("Failed to load treatment advice.");
            }
        };

        getPatientDetails();
        getTreatmentContent();
    }, [patientId, prescriptionId]);

    return (
        <PageWrapper>
            <div className="flex justify-center items-center mt-5 px-4">
                <div className="relative w-[1390px] h-[600px] p-2 rounded-lg border border-slate-200 shadow-md bg-white overflow-y-auto scroll-smooth">
                    <div className="p-6 border-2 border-[#3B9AB8] rounded-2xl">
                        <h2 className="text-lg text-gray-700 font-serif italic">
                            You are viewing a prescription of - 
                            <span className="font-bold"> {patientDetails?.newPatient.fullName}</span>
                        </h2>
                    </div>

                    <div className="p-6 border-2 border-[#3B9AB8] rounded-xl shadow-lg mt-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Prescribed Medications</h3>

                        <div className="overflow-x-auto">
                            <div className="min-w-max w-full">
                                <div className="grid grid-cols-5 bg-gray-200 p-3 font-semibold text-gray-700 text-center rounded-t-lg">
                                    <div className="p-2">Medication</div>
                                    <div className="p-2">Dose</div>
                                    <div className="p-2">Frequency</div>
                                    <div className="p-2">Duration</div>
                                    <div className="p-2">Meal Timing</div>
                                </div>

                                {isLoading ? (
                                    <Loader className="mx-7 my-7" />
                                ) : medication?.length > 0 ? (
                                    medication.map((med: any, index: number) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-5 text-center p-3 text-gray-600 border-b odd:bg-gray-50 even:bg-white items-center"
                                        >
                                            <div className="p-2 font-medium">{med.medication}</div>
                                            <div className="p-2">{med.dose} {med.doseUnit}</div>
                                            <div className="p-2">{med.morning ? "|" : "0"} - {med.afternoon ? "|" : "0"} - {med.evening ? "|" : "0"}</div>
                                            <div className="p-2">{med.duration} {med.durationUnit}</div>
                                            <div className="p-2">{med.mealStatus === "aftermeal" ? "After Meal" : "Before Meal"}</div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 p-4 italic">
                                        No prescribed medications available.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-2 border-[#3B9AB8] rounded-xl shadow-lg mt-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Treatment Advice</h3>
                        <div className="p-4 bg-gray-50 rounded-lg text-gray-700">
    <pre className="whitespace-pre-wrap font-serif">{treatmentAdvice}</pre>
</div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};
