import { DashboardCard } from "../../Wrapper/DashboardCardWrapper"
import { Button } from "../Inputs/Button"

export const OutPatient =()=>{
    return <DashboardCard>
        <div className="p-4">
            <div className="flex items-center justify-between font-semibold">
                            <span className="text-xl">Out Patient</span>
                            <div className="grid grid-cols-1 gap-5">
                              <Button size="md" variant="secondary" title="View All"/>
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
    </DashboardCard>
}