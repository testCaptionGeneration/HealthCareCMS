import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavbarComponent } from "../Components/NavbarComponent";
import Upper from "../Components/Upper";
import { useSearchParams } from "react-router-dom";

// Define the Doctor interface
interface Doctor {
  _id: string;
  fullName: string;
  hospital: string;
}

const Dashboard: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const[searchparams]=useSearchParams();
  const patientid=searchparams.get("temp");
  console.log(patientid)
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Fetch doctors when searchQuery changes
  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchDoctors(searchQuery);
    } else {
      setDoctors([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  const fetchDoctors = async (query: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/cms/v1/doctor/doctors/${query}`
      );
      setDoctors(response.data.doctors);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
      setShowDropdown(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle selecting a doctor
  const handleSelectDoctor = (doctor: Doctor) => {
    setSearchQuery(doctor.fullName); // Update input field
    setSelectedDoctor(doctor); // Store selected doctor
    setShowDropdown(false); // Close dropdown
  };

  

  // Handle Allow Access (Send doctor ID to backend)
  const handleAllowAccess = async (doctor: Doctor) => {
    try {
      const response = await axios.post("http://localhost:3000/cms/v1/doctor/allowed", {
        doctorId: doctor._id, 
        patientId:patientid
      });

      alert(`Access granted to Dr. ${doctor.fullName}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error allowing access:", error);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="flex justify-center">
        <div className="w-[1370px] m-5 border p-6 border-slate-400 rounded-2xl relative">
          <div className="font-medium text-xl mb-3">
            Search for a Doctor
            <div className="font-normal text-sm text-slate-500 italic">
              Please enter a doctor's name to search
            </div>
          </div>

          {/* Search Input Field */}
          <input
            type="text"
            placeholder="Type to search doctor..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Dropdown List */}
          {showDropdown && doctors.length > 0 && (
            <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {doctors.map((doctor) => (
                <li
                  key={doctor._id}
                  className="flex justify-between items-center p-3 hover:bg-blue-100 cursor-pointer"
                >
                  <div onClick={() => handleSelectDoctor(doctor)}>
                    {doctor.fullName} <span className="text-gray-500">({doctor.hospital})</span>
                  </div>

                  {/* ALLOW ACCESS Button */}
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                    onClick={() => handleAllowAccess(doctor)} // Send doctor ID
                  >
                    Allow Access
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* No results message */}
          {showDropdown && doctors.length === 0 && !loading && (
            <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 text-gray-500">
              No doctors found
            </div>
          )}

          {/* Display Selected Doctor with "Allow Access" Button */}
          {selectedDoctor && (
            <div className="mt-4 p-4 border rounded-lg shadow-lg flex justify-between items-center">
              <span className="text-lg font-semibold">{selectedDoctor.fullName} ({selectedDoctor.hospital})</span>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={() => handleAllowAccess(selectedDoctor)} // Send doctor ID
              >
                Allow Access
              </button>
            </div>
          )}
        </div>
      </div>

      <Upper />
    </>
  );
};

export default Dashboard;
