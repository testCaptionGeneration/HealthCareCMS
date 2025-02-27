import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CloseIcon } from "../../Icons/CloseIcon";
import { useParams } from "react-router-dom";

interface Disease {
    disease: string;
}

interface AddDiseasePopupProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const severityOptions = ["Mild", "Moderate", "Severe"];

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
    const { prescriptionId = "" } = useParams();

    useEffect(() => {
        const storedDoctorId = localStorage.getItem("doctorId");
        if (storedDoctorId) {
            setDoctorId(storedDoctorId);
        } else {
            setError("Doctor ID not found. Please log in again.");
        }
    }, []);

    useEffect(() => {
        if (!searchQuery) return;

        const fetchDiseases = async () => {
            try {
                console.log("Fetching diseases:", searchQuery);
                const response = await axios.get(
                    `http://localhost:3000/cms/v1/doctor/disease/${encodeURIComponent(searchQuery)}`
                );
                setDiseaseList(response.data.diseases?.map((d: Disease) => d.disease) || []);
            } catch (error) {
                console.error("Error fetching diseasese:", error);
                setError("Failed to fetch diseases. Please try again.");
            }
        };

        fetchDiseases();
    }, [searchQuery]);

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

        setError("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/cms/v1/doctor/postdiseases", {
                doctorId,
                disease: disease.trim(),
                severity: severity.trim(),
                prescriptionId
            });

            if (response.status === 201) {
                setOpen(false);
                setDisease("");
                setSeverity("");
            }
        } catch (error: any) {
            console.error("Error adding disease:", error.response?.data);
            setError(error.response?.data?.message || "Failed to add disease. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

            <div className="relative bg-white p-8 rounded-2xl w-[520px] h-[290px] shadow-xl">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-700">Add Disease</h2>
                        <p className="text-sm text-gray-500 mt-1">Please select disease details below</p>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 text-gray-400 hover:text-gray-700 absolute top-2 right-2"
                    >
                        <CloseIcon size={28} />
                    </button>
                </div>

                {/* Form Fields */}
                <div className="flex space-x-6 mb-6">
                    {/* Disease Input */}
                    <div className="flex-1 relative" ref={searchRef}>
                        <label className="block text-gray-700 font-medium mb-2">Disease Name</label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowDiseaseOptions(true);
                            }}
                            onClick={() => setShowDiseaseOptions(true)}
                            placeholder="Search diseases..."
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
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
                                    <div className="px-3 py-2 text-gray-500 italic">No matching diseases found</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Severity Dropdown */}
                    <div className="flex-1">
                        <label className="block text-gray-700 font-medium mb-2">Severity</label>
                        <select
                            value={severity}
                            onChange={(e) => setSeverity(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
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

                {/* Error Message */}
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleAddDisease}
                        disabled={loading}
                        className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? "Adding..." : "Add Disease"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddDiseasePopup;
