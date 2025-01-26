import React from "react";

interface Medication {
  name: string;
  specialty: string;
  experience: string;
  buttonText: string;
}

const medications: Medication[] = [
  {
    name: "Amanda Clara",
    specialty: "Specialist",
    experience: "12 years experience",
    buttonText: "Prescription",
  },
  {
    name: "Jason Shatsky",
    specialty: "Specialist",
    experience: "10 years experience",
    buttonText: "Prescription",
  },
];

const Med: React.FC = () => {
  return (
    <div className="mx-6">
      <h2 className="text-xl font-semibold mb-4">Ongoing Medication List</h2>
      <div className="space-y-4">
        {medications.map((medication, index) => (
          <div
            key={index}
            className="flex items-center justify-between border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <h3 className="text-lg font-medium">{medication.name}</h3>
                <p className="text-sm text-gray-600">{medication.specialty}</p>
                <p className="text-sm text-gray-600">{medication.experience}</p>
              </div>
            </div>
            <button className="bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-600">
              {medication.buttonText}
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg- text-white font-medium py-2 px-6 rounded ">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Med;
