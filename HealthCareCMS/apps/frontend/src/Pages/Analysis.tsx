import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavbarComponent } from "../Components/NavbarComponent";
import DiseaseAnalysisPage from "./DiseaseAnalysisPage";

interface DiseaseData {
  _id: string;
  doctorId: string;
  disease: string;
  severity: "mild" | "moderate" | "severe";
}

interface DiseaseCountData {
  disease: string;
  count: number;
}

interface SeverityData {
  severity: string;
  count: number;
}

// Define props interface for DiseaseAnalysisPage
interface DiseaseAnalysisPageProps {
  doctorId: string;
  diseaseCount: DiseaseCountData[];
  severityCount: SeverityData[];
}

// Type assertion to tell TypeScript that DiseaseAnalysisPage accepts these props
const TypedDiseaseAnalysisPage = DiseaseAnalysisPage as React.ComponentType<DiseaseAnalysisPageProps>;

export const AnalysisPage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId?: string }>();
  const [diseaseCount, setDiseaseCount] = useState<DiseaseCountData[]>([]);
  const [severityCount, setSeverityCount] = useState<SeverityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!doctorId) {
        setError("Doctor ID is missing or invalid");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/cms/v1/doctor/postdiseases");
        if (!response.ok) {
          throw new Error("Failed to fetch disease data");
        }

        const data: DiseaseData[] = await response.json();
        const filteredData = data.filter((item) => item.doctorId === doctorId);

        // Process disease counts
        const diseaseMap: Record<string, number> = {};
        const severityMap: Record<string, number> = {};

        filteredData.forEach((item) => {
          diseaseMap[item.disease] = (diseaseMap[item.disease] || 0) + 1;
          severityMap[item.severity] = (severityMap[item.severity] || 0) + 1;
        });

        setDiseaseCount(
          Object.entries(diseaseMap)
            .map(([disease, count]) => ({ disease, count }))
            .sort((a, b) => b.count - a.count)
        );

        setSeverityCount(
          Object.entries(severityMap)
            .map(([severity, count]) => ({ severity, count }))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctorId]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-md w-full mx-auto">
          <div className="text-red-500 font-medium text-center">
            <h2 className="text-base sm:text-lg font-semibold mb-2">Error</h2>
            <p className="text-sm sm:text-base text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavbarComponent DoctorId={doctorId || ""} />
      <div className="w-[1480px] max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="flex-grow py-4 sm:py-6">
          <TypedDiseaseAnalysisPage
            doctorId={doctorId || ""}
            diseaseCount={diseaseCount}
            severityCount={severityCount}
          />
        </main>
      </div>
    </div>
  );
};

export default AnalysisPage;