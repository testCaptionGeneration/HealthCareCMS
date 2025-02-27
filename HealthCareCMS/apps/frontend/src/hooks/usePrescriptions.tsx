import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const usePrescriptions = ({ patientId, refresh }: { patientId: string; refresh?: boolean }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_URL}cms/v1/doctor/prescription/patient/${patientId}?page=${page}&limit=5`
        );
        setPrescriptions(response.data.response || []);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        setPrescriptions([]);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPrescriptions();
    }
  }, [patientId, refresh, page]); 

  return { prescriptions, loading, setPage, page };
};
