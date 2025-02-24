import { useState } from "react";
import { Button } from "../Inputs/Button";
import { CreatePatient } from "../../Creation/CreatePatientDetails";
import { DashboardCard } from "../../Wrapper/DashboardCardWrapper";
import { Search } from "../PopUps/SearchPopUp";

export const QueueCard = () => {
  const [openCreator, setOpenCreator] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <DashboardCard>
      <div className=" ">
        <Search open={openSearch} setOpen={setOpenSearch}/>
        <div>
          <div className="z-90">
            <CreatePatient open={openCreator} setOpen={setOpenCreator} />
          </div>
          <div>
            <div className="p-4">

              <div className="flex items-center justify-between font-semibold">
                <span className="text-xl">Queue</span>
                <div className="grid grid-cols-2 gap-5">
                  <Button
                    title="View All" size="md" variant="secondary"
                  />
                  <Button
                    onClick={() => setOpenSearch(true)} title="Search Patient" size="md" variant="secondary"
                  />
                </div>
              </div>
              <div className="bg-[#3B9AB8] w-full h-12 rounded-2xl shadow-md border-2 border-white  mt-4 flex justify-center items-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full px-6 text-white text-center">
                  <div className="p-1">Patient</div>
                  <div className="p-1">Arrival</div>
                  <div className="p-1">Disease</div>
                  <div className="p-1">Prescription</div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </DashboardCard>
  );
};