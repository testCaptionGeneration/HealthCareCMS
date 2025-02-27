import { Button } from "../Components/Inputs/Button"
import { CheckBox } from "../Components/Inputs/CheckBox"
import { Input } from "../Components/Inputs/Input"
import { useState } from "react"
import { CloseIcon } from "../Icons/CloseIcon"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useParams } from "react-router-dom"

enum MedTime {
    AfterMeal = "aftermeal",
    BeforeMeal = "beforemeal"
}

export const CreatePrescription = ({ open, setOpen  }: { open: boolean, setOpen: (value: boolean) => void }) => {
    const [time, setTime] = useState(MedTime.AfterMeal);
    const prescriptionId = useParams().prescriptionId;

    const [medicine, setMedication] = useState("");
    const [Dose, setDose] = useState<String | null>(null);
    const [DoseUnit, setDoseUnit] = useState<String | null>("mg");
    const [Duration, setDuration] = useState<String | null>(null);
    const [DurationUnit, setDurationUnit] = useState<String | null>("Day");
    const [Morning, setMorning] = useState<boolean | null>(null);
    const [Afternoon, setAfternoon] = useState<boolean | null>(null);
    const [Evening, setEvening] = useState<boolean | null>(null);

    const medicationData = async () => {
        if (!prescriptionId) {
            console.error("Error: Prescription ID is missing!");
            return;
        }
 
        try {
            await axios.post(`${BACKEND_URL}cms/v1/doctor/medication`, {
                prescriptionId:prescriptionId,
                medication: medicine,
                dose: Dose,
                doseUnit: DoseUnit,
                duration: Duration,
                durationUnit: DurationUnit,
                morning: Morning,
                afternoon: Afternoon,
                evening: Evening,
                mealStatus: time
            });

            setOpen(false);
            window.dispatchEvent(new Event("medicineUpdated"));
        } catch (error) {
            console.error("Error adding medication:", error);
        }
    };

    return (
        <div>
            {open && (
                <div className="min-h-screen min-w-screen fixed inset-0 flex justify-center items-center z-50">
                    <div className="absolute inset-0 bg-black/20"></div>

                    <div className="bg-white w-[90%] lg:max-w-[1000px] md:min-w-[800px] h-auto p-7 relative rounded-2xl shadow-lg">
                        <div className="absolute right-1 top-1 text-[#3B9AB8]" onClick={() => setOpen(false)} >
                            <CloseIcon size={28.5} />
                        </div>

                        <div className="space-y-4">
                            <div className="grid  lg:grid-cols-3 md:grid-cols-2">
                                <div className="flex-1">
                                    <Input placeholder="Medication" size="large" type="text" onChange={(e) => setMedication(e.target.value)} />
                                </div>
                                <div className="w-1/4 md:w-auto flex items-center">
                                    <Input placeholder="Dose" size="small" type="number" onChange={(e) => setDose(e.target.value)} />
                                    <select onChange={(e) => setDoseUnit(e.target.value)} name="MedicineUnit" id="medicineUnit" className='h-[40px] shadow-md w-32 mx-2 rounded-md p-1 focus:outline-none' >
                                        <option value="mg">mg</option>
                                        <option value="g">g</option>
                                        <option value="mcg">mcg</option>
                                        <option value="kg">kg</option>
                                        <option value="mL">mL</option>
                                        <option value="L">L</option>
                                        <option value="cc">cc</option>
                                        <option value="drop">drop (gtt)</option>
                                        <option value="IU">IU</option>
                                        <option value="percent_wv">% w/v</option>
                                        <option value="percent_vv">% v/v</option>
                                        <option value="percent_ww">% w/w</option>
                                        <option value="mg_kg">mg/kg</option>
                                        <option value="mcg_kg">mcg/kg</option>
                                        <option value="mg_m2">mg/m²</option>
                                        <option value="mEq">mEq</option>
                                        <option value="units">Units</option>
                                        <option value="puff">Puff</option>
                                        <option value="suppository">Suppository</option>
                                        <option value="ampule">Ampule</option>
                                        <option value="vial">Vial</option>
                                        <option value="tablets">Tablets</option>
                                        <option value="capsules">Capsules</option>
                                        <option value="injection">Injection</option>
                                        <option value="patch">Patch</option>
                                        <option value="cream">Cream</option>
                                        <option value="ointment">Ointment</option>
                                        <option value="gel">Gel</option>
                                        <option value="application">Application</option>
                                    </select>

                                </div>
                                <div className="w-1/4 md:w-auto flex items-center">
                                    <Input placeholder="Duration" size="small" type="number" onChange={(e) => setDuration(e.target.value)} />
                                    <select onChange={(e) => setDurationUnit(e.target.value)} name="DurationUnit" id="durationunit" className='h-[40px] shadow-md w-32 mx-2 rounded-md p-1 focus:outline-none'>
                                        <option value="days">Day(s)</option>
                                        <option value="months">Month(s)</option>
                                        <option value="Years">Year(s)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="p-3 shadow-md rounded-2xl">
                                <div className="font-semibold">Frequency</div>
                                <div className="flex flex-wrap gap-3">
                                    <CheckBox onChange={(e) => setMorning(e.target.checked)} name="Morning" title="Morning" id="morning" />
                                    <CheckBox onChange={(e) => setAfternoon(e.target.checked)} name="Afternoon" title="Afternoon" id="afternoon" />
                                    <CheckBox onChange={(e) => setEvening(e.target.checked)} name="Evening" title="Evening" id="evening" />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-center md:justify-end items-center gap-3">
                                <Button
                                    onClick={() => setTime(MedTime.BeforeMeal)}
                                    title="Before Meal"
                                    size="md"
                                    variant={time === MedTime.BeforeMeal ? "primary" : "secondary"}
                                />
                                <Button
                                    onClick={() => setTime(MedTime.AfterMeal)}
                                    title="After Meal"
                                    size="md"
                                    variant={time === MedTime.AfterMeal ? "primary" : "secondary"}
                                />
                            </div>
                        </div>

                        <div className="flex justify-center items-center mt-5">
                            <Button title="Add Medication" variant="primary" size="md" onClick={medicationData} />
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
};
