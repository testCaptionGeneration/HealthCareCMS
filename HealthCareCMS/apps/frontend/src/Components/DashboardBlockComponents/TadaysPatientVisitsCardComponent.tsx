import { useState } from "react";
import { Button } from "../Inputs/Button";
import { CreatePatient } from "../CreatePatient";
import { CardWrapper } from "../Wrapper/CardWrapper";

export const TodayPatientCard = () => {
  const [openCreator, setOpenCreator] = useState(false);

  return (
    <CardWrapper>
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
                onClick={() => setOpenCreator(true)} title="Add Patient" size="md" variant="secondary"
              />
            </div>
          </div>
        </div>
      </div>

    </CardWrapper>
  );
};

