import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Disease {
    disease: string;
}

interface AddDiseasePopupProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const AddDiseasePopup: React.FC<AddDiseasePopupProps> = ({ open, setOpen }) => {
    const [disease, setDisease] = useState("");
    const [severity, setSeverity] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showDiseaseOptions, setShowDiseaseOptions] = useState(false);
    const [diseaseList, setDiseaseList] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [doctorId, setDoctorId] = useState<string | null>(null);

    const searchRef = useRef<HTMLDivElement>(null);
    const {prescriptionId=""}=useParams();
    console.log(prescriptionId);
    

    useEffect(() => {
        const fetchDoctorId = () => {
            const storedDoctorId = localStorage.getItem("doctorId");
            if (storedDoctorId) {
                setDoctorId(storedDoctorId);
            } else {
                setError("Doctor ID not found. Please log in again.");
            }
        };

        fetchDoctorId();
    }, []);

    useEffect(() => {
        const fetchDiseases = async () => {
            try {
                console.log("Fetching diseases with query:", searchQuery);
                const response = await axios.get(
                    `http://localhost:3000/cms/v1/doctor/disease/${encodeURIComponent(searchQuery)}`
                );
                console.log("Response:", response.data);
                const diseases = response.data.diseases || [];
                setDiseaseList(diseases.map((d: Disease) => d.disease));
            } catch (error) {
                console.error("Error fetching diseases:", error);
                setError("Failed to fetch diseases. Please try again.");
            }
        };

        if (searchQuery) fetchDiseases();
    }, [searchQuery]);

    const severityOptions = ["Mild", "Moderate", "Severe"];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowDiseaseOptions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectDisease = (selected: string) => {
        setDisease(selected);
        setSearchQuery(selected);
        setShowDiseaseOptions(false);
    };

    const handleAddDisease = async () => {
        if (!doctorId) {
            setError("Doctor ID is missing.");
            return;
        }

        if (!disease || !severity) {
            setError("Please select a disease and severity.");
            return;
        }

        console.log("Sending request with:", {
            doctorId,
            disease,
            severity
        });

        setError("");
        setLoading(true);

        try {
            const requestData = {
                doctorId,
                disease: disease.trim(),
                severity: severity.trim(),
                prescriptionId
            };

            const response = await axios.post(
                "http://localhost:3000/cms/v1/doctor/postdiseases",
                requestData
            );

            if (response.status === 201) {
                setOpen(false);
                setDisease("");
                setSeverity("");
            }
        } catch (error: any) {
            console.error("Error details:", error.response?.data);
            setError(error.response?.data?.message || "Failed to add disease. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="min-h-screen min-w-screen flex inset-0 fixed justify-center items-center z-50">
            <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>
            <div className="relative bg-white p-10 rounded-2xl w-[550px] shadow-xl">
                <button 
                    onClick={() => setOpen(false)} 
                    className="absolute right-0 top-0 p-2 text-gray-400 hover:text-gray-700 duration-300 cursor-pointer"
                >
                    <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M6 18L18 6M6 6l12 12" 
                        />
                    </svg>
                </button>
                
                <div className="flex-col justify-center font-bold text-2xl text-gray-700 mb-6">
                    <div>Add Disease</div>
                    <div className="font-medium text-sm text-gray-500 mt-1">
                        Please select disease details below
                    </div>
                </div>

                <div className="flex space-x-6 mb-6">
                    <div className="flex-1" ref={searchRef}>
                        <label className="block text-gray-700 font-medium mb-2">
                            Disease Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowDiseaseOptions(true);
                                }}
                                onClick={() => setShowDiseaseOptions(true)}
                                placeholder="Search diseases..."
                                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            />
                            {showDiseaseOptions && (
                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                    {diseaseList.length > 0 ? (
                                        diseaseList.map((option) => (
                                            <div
                                                key={option}
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => selectDisease(option)}
                                            >
                                                {option}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-3 py-2 text-gray-500 italic">
                                            No matching diseases found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-2">
                            Severity
                        </label>
                        <select
                            value={severity}
                            onChange={(e) => setSeverity(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            <option value="">Select severity</option>
                            {severityOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-sm mb-4">{error}</div>
                )}

                <div className="flex justify-center mt-8">
                    <button 
                        onClick={handleAddDisease} 
                        disabled={loading}
                        className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? "Adding..." : "Add Disease"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddDiseasePopup;