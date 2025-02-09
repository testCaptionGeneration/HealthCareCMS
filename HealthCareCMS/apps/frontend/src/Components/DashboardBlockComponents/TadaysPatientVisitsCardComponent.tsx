import { useState } from "react";
import { Button } from "../Inputs/Button";
import { CreatePatient } from "../../Creation/CreatePatientDetails";
import { CardWrapper } from "../../Wrapper/CardWrapper";

export const TodayPatientCard = () => {
  const [openCreator, setOpenCreator] = useState(false);

  return (
    <CardWrapper >
      <div>
        <div className="z-90">
          <CreatePatient open={openCreator} setOpen={setOpenCreator} />
        </div>
        <div >


          <CreatePatient open={openCreator} setOpen={setOpenCreator} />



          <div className="p-4">

            <div className="flex items-center justify-between font-semibold">
              <span>Today's Patient Visits: Quick Overview</span>

              <Button
                 title="View All" size="md" variant="secondary"
              />
              <Button
                onClick={() => setOpenCreator(true)} title="Add Patient" size="md" variant="secondary"
              />
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

    </CardWrapper>
  );
};

