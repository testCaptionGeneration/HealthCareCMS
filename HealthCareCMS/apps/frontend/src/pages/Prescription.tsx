import axios from "axios";
import { Button } from "../Components/Inputs/Button";
import { PageWrapper } from "../Components/Wrapper/PageWrapper";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreatePrescription } from "../Creation/CreatePrescription";
import { AddIcon } from "../Icons/AddIcon";

interface Patient {
    name: string;
    age: number;
    gender:String;
    disease: string;
    severity:String;
    number: String;
    birth:String;
}

interface PatientDetailsResponse {
    newPatient: Patient;
}

export const PrescriptionComponent = () => {
    const [prescriptionMediacation,setPrescritptionMedication]=useState(false);
    const [patientDetails, setPatientDetails] = useState<PatientDetailsResponse | null>(null);
    const { userId } = useParams()
    console.log(userId);
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (!userId) {
                    console.log("No userId found in localStorage");
                    return;
                }

                const response = await axios.get<PatientDetailsResponse>(`${BACKEND_URL}cms/v1/doctor/patientdetails/${userId}`);
                setPatientDetails(response.data);
                console.log(patientDetails?.newPatient);
            } catch (error) {
                console.log(`An error occurred ${error}`);
            }
        };

        fetchDetails();
    }, [userId]);

    return (
        <PageWrapper>
            <div className="flex justify-center items-center mt-12">
                <div className="relative w-full max-w-[670px] md:h-[325px] lg:min-w-[1400px] lg:h-[600px] md:w-[500px] xs:h-[200px] xs:w-[400px]  rounded-lg border border-slate-200 overflow-scroll scrollBar-1">
            <CreatePrescription open={prescriptionMediacation} setOpen={setPrescritptionMedication}/>
                    <div className="p-6 space-y-6 border-2 border-[#3B9AB8] m-3 rounded-2xl">
                       <span><i> <strong className="text-lg uppercase"> {patientDetails?.newPatient.name},</strong> {patientDetails?.newPatient.gender}, {patientDetails?.newPatient.age} Years,  +{patientDetails?.newPatient.number} </i> </span>                        
                       <div>
                        <strong>Chief Complaints: {patientDetails?.newPatient.disease}</strong> (Severity : {patientDetails?.newPatient.severity})  
                       </div>
                    </div>

                    <div className="absolute bottom-6 right-6">
                        
                        <Button startIcon={<AddIcon size={20}/>} size="md" variant="secondary" title="Add Medicine" onClick={()=>setPrescritptionMedication(true)}/>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
