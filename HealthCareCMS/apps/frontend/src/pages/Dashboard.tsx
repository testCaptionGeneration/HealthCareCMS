import { useState, useEffect } from "react";
import { NavbarComponent } from "../Components/NavbarComponent";
import { QueueCard } from "../Components/DashboardBlockComponents/Queue";
import { OutPatient } from "../Components/DashboardBlockComponents/OutPatient";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Dashboard = () => {
  const [greeting, setGreeting] = useState("");
  const { doctorId } = useParams<{ doctorId: string }>();
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning 🌅");
    } else if (hour < 18) {
      setGreeting("Good Afternoon ☀️");
    } else {
      setGreeting("Good Evening 🌙");
    }

    const getDoctorName = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}cms/v1/doctor/${doctorId}`);
        setDoctorName(response.data.name);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    getDoctorName();
  }, [doctorId]);

  return (
    <div className="text-slate-700 min-h-screen min-w-screen bg-slate-200">
      <NavbarComponent />

      <div className="flex w-full px-7 mt-5">
        <h1 className="text-2xl font-semibold">
          {greeting} Dr. {doctorName}
        </h1>
      </div>

      <div className="flex justify-center">
        <div className="grid xl:grid-cols-1 lg:grid-cols-2 xl:gap-10">
          <div className="grid grid-cols-3"></div>
          <div className="flex justify-center gap-5">
            <QueueCard />
            <OutPatient />
          </div>
        </div>
      </div>
    </div>
  );
};
