import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import { Button } from "../Inputs/Button";
import axios from "axios";
import { useEffect } from "react";
export const AddPrescriptionPopUp = ({open,setOpen}:{open:boolean, setOpen:(vaue:boolean)=>void}) => {
    const { patientId = "", doctorId = "" } = useParams();
    const navigate=useNavigate();
    let doctorName:String="";
    let patientName:String="";

    const getPatientName=async ()=>{
      try{
        const response= await axios.get(`${BACKEND_URL}cms/v1/doctor/prescription/patientname/${patientId}`);
        patientName=response.data.response.fullName;
        console.log(patientName);
    }
    catch(error){
      console.error("Error fetching patient details:", error);
    }
    }
    getPatientName();

    useEffect(() => {
      const getDoctorName = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}cms/v1/doctor/prescription/doctorname/${doctorId}`);
          console.log(response)
          doctorName = response.data.name;
        } catch (error) {
          console.error("Error fetching patient details:", error);
        }
      };
      getDoctorName();

      
    })
    

    return <div>{open && <div className="min-h-screen min-w-screen fixed inset-0  flex justify-center items-center z-50">
        <div className=" absolute inset-0 backdrop-blur-xs bg-black/20"></div>

        <div className="relative bg-white rounded-2xl shadow-md   py-4">
            <div className="p-4 flex-col">
                <div className="px-2 font-bold text-xl text-gray-500 flex justify-start">Add a prescription?</div>
                <div className="px-2 text-gray-500 italic">You will be prescribing medication for this patient next.</div>
            </div>

            <div className="flex p-2 justify-center">
                <div className="mx-2">
                    <Button variant="secondary" title="Prescribe" size="md" onClick={async () => {
              try {
                const response = await axios.post(`${BACKEND_URL}cms/v1/doctor/prescription/presId`, {
                  patientId,
                  doctorName: doctorName,
                  patientName: patientName,
                  doctorId: doctorId,
                  date: new Date(Date.now())
                });
                navigate(`/cms/v1/doctor/patient/prescription/${response.data.response._id}`);
              } catch (error) {
                console.error("Error adding prescription:", error);
              }
            }}/>
                </div>
                <div className="mx-2">
                    <Button variant="secondary" title="Dismiss" size="md" onClick={()=>setOpen(false)}/>
                </div>
            </div>
        </div>
    </div>}
    </div>;
};