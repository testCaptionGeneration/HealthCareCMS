import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { NavbarComponent } from "../Components/NavbarComponent";
import { QueueCard } from "../Components/DashboardBlockComponents/Queue";
import { OutPatient } from "../Components/DashboardBlockComponents/OutPatient";
import { BACKEND_URL } from "../config";

export const Dashboard = () => {
  const { DoctorId = "" } = useParams();
  const [greeting, setGreeting] = useState("");
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const setGreetingMessage = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        setGreeting("Good Morning 🌅");
      } else if (hour < 18) {
        setGreeting("Good Afternoon ☀️");
      } else {
        setGreeting("Good Evening 🌙");
      }
    };

    const fetchDoctorName = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}cms/v1/doctor/prescription/doctorname/${DoctorId}`
        );
        setDoctorName(response.data.name);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    setGreetingMessage();
    fetchDoctorName();
  }, [DoctorId]);

  return (
    <div className="text-slate-700 overflow-y-scroll min-h-screen min-w-screen bg-slate-200">
      <NavbarComponent DoctorId={DoctorId} />

      <div className="flex justify-center mt-6">
        <h1 className="text-3xl md:text-2xl bg-white p-4 rounded-2xl shadow-lg font-semibold text-gray-800">
          <span className="text-slate-700">{greeting}, </span>
          <span className="font-bold text-slate-500">Dr. {doctorName}</span>
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





