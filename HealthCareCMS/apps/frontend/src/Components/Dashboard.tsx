import React from "react";
import Medication from "./Medication"
import Upper from "./Upper";
import Navbar from "./Navbar";
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
