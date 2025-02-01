import React from "react";
import Medication from "../../../patient-frontend/src/Components/Medication"
import Upper from "../Components/Upper";
import Navbar from "../Components/Navbar";
const Dashboard: React.FC = () => {
  return (
    <div  className="px-14"  >
      <Navbar/>
      <Upper/>
      <Medication />
    </div>
  );
};

export default Dashboard;
