import { Button } from "../Components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { NavbarComponent } from "../Components/NavbarComponent";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const AllPastPrescription: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const patientId = query.get("temp");
  
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}cms/v1/doctor/prescription/patient/${patientId}?page=${page}&limit=5`);
        setPrescriptions(response.data.response || []);
        setHasMore(response.data.hasMore);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPrescriptions();
    }
  }, [patientId, page]);

  return (
    <>
    <NavbarComponent/>
    <div className="flex justify-center items-center ">
      <div className="relative w-[1390px] p-2">
        <h2 className="text-xl font-semibold mb-4 mx-5">All Past Prescriptions</h2>
        <div className="flex-col gap-4 w-full bg-gray-100 border-b-blue-300 rounded-[31px] shadow-md">
          <div className="pt-2 space-y-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : prescriptions.length > 0 ? (
              prescriptions.map((prescription, index) => (
                <div
                  key={index}
                  className="flex items-center border-b odd:bg-gray-50 even:bg-white border-slate-400 justify-between bg-white rounded-[14px] shadow-md m-4 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 m-3 p-3 flex items-center bg-gray-200 rounded-full">
                      <div className="pl-1">{prescription.doctorName.charAt(0).toUpperCase()}</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium pl-2">{prescription.doctorName}</h3>
                      <p className="text-sm pl-2 text-gray-600">
                        {new Date(prescription.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="pr-3">
                    <Button
                      onClick={() => navigate(`/patient/pastPrescription/${prescription._id}/${patientId}`)}
                      title="Prescription"
                      size="md"
                      variant="secondary"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No prescriptions found</p>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center my-4 space-x-4">
              <Button
                title="Previous"
                size="md"
                variant="secondary"
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              />
              <Button
                title="Next"
                size="md"
                variant="secondary"
                disabled={!hasMore}
                onClick={() => setPage((prev) => prev + 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AllPastPrescription;
