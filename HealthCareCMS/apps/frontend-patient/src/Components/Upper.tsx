import { Button } from "./Button";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Upper: React.FC = () => {
  const query = useQuery();
  const patientId = query.get("temp");
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log("patietnif",patientId)
  useEffect(() => {
    console.log("ou")
    const fetchPrescriptions = async () => {
      
      try {
        setLoading(true);
        console.log("hii i am there")
        const response = await axios.get(`${BACKEND_URL}cms/v1/doctor/prescription/patient/${patientId}`);
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
    <div className="mx-6 mb-10">
      <h2 className="text-xl font-semibold mb-4">Ongoing Medication List</h2>
      <div className="flex-col  gap-4 w-full h-[311px] bg-white rounded-[31px] shadow-md border ">
        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : prescriptions.length > 0 ? (
            prescriptions.map((prescription, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white rounded-[14px] shadow-md m-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <h3 className="text-lg font-medium">{prescription.doctorName}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(prescription.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button title="Prescription" size="md" variant="secondary" />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No prescriptions found</p>
          )}
          <div className="flex justify-center items-center my-4">
            <Button title="View More" size="md" variant="secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upper;
