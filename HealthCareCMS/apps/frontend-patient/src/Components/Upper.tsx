import { Button } from "./Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Upper: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const patientId = query.get("temp");
  interface Prescription {
    doctorName: string;
    date: string;
    _id: string;
  }

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
 
  useEffect(() => {
    const fetchPrescriptions = async () => {
      
      try {
        setLoading(true);
        console.log("hii i am there")
        const response = await axios.get(`${BACKEND_URL}cms/v1/doctor/prescription/patient/${patientId}?limit=3`);
        console.log("res",response)
        setPrescriptions(response.data.response || []);
        setLoading(false); /// is accessed correctly
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } 
    };
  
    
      fetchPrescriptions();
    
  }, [patientId]);

  return (

    <div className="flex justify-center items-center ">
      <div className="relative w-[1390px] p-2 ">
      
      <h2 className="text-xl font-semibold mb-4 mx-5">Ongoing Medication List</h2>
      <div className="flex-col  gap-4 w-full  bg-gray-100 border-b-blue-300 rounded-[31px] shadow-md  ">
        <div className=" pt-2 space-y-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : prescriptions.length > 0 ? (
            prescriptions.map((prescription, index) => (
              <div
                key={index}
                className="flex items-center border-b odd:bg-gray-50 even:bg-white items-cente border-slate-400 justify-between bg-white rounded-[14px] shadow-md m-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 m-3 p-3 flex items-center bg-gray-200 rounded-full">
                    <div className="pl-1">  {prescription.doctorName.charAt(0).toUpperCase()}</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium pl-2">{prescription.doctorName}</h3>
                    <p className="text-sm pl-2 text-gray-600">
                      {new Date(prescription.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="pr-3">
                <Button onClick={() =>
                    navigate(`/patient/pastPrescription/${prescription._id}/${patientId}`)
                  } title="Prescription" size="md" variant="secondary" />
                  </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No prescriptions found</p>
          )}
          <div className="flex pd- justify-center items-center my-4">
            <Button onClick={()=>{
              navigate(`allprescriptions/?temp=${patientId}`);
              //patient-dashboard/?temp=${id}
            }}  title="View More" size="md" variant="secondary" />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Upper;
