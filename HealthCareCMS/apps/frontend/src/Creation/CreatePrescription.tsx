import { Button } from "../Components/Inputs/Button"
import { CheckBox } from "../Components/Inputs/CheckBox"
import { Input } from "../Components/Inputs/Input"
import { useState } from "react"
import { CloseIcon } from "../Icons/CloseIcon"

enum MedTime {
    AfterMeal = "aftermeal",
    BeforeMeal = "beforemeal"
}

export const CreatePrescription = ({ open, setOpen }: { open: boolean, setOpen: (value: boolean) => void }) => {
    const [time, setTime] = useState(MedTime.AfterMeal);

    return (
        <div>
            {open && (
                <div className="min-h-screen min-w-screen fixed inset-0 flex justify-center items-center z-50">
                    <div className="absolute inset-0 bg-black/20"></div>

                    <div className="bg-white w-[90%] max-w-[1000px] md:max-w-[800px] h-auto p-5 relative rounded-2xl shadow-lg">
                        <div className="absolute right-1 top-1 text-[#3B9AB8]" onClick={() => setOpen(false)}>
                            <CloseIcon size={28.5} />
                        </div>

                        <div className="space-y-4">
                            <div className="grid  lg:grid-cols-3 md:grid-cols-2">
                                <div className="flex-1">
                                    <Input placeholder="Medication" size="large" type="text" />
                                </div>
                                <div className="w-1/4 md:w-auto">
                                    <Input placeholder="Dose" size="large" type="number" />
                                </div>
                                <div className="w-1/4 md:w-auto">
                                    <Input placeholder="Duration" size="large" type="number" />
                                </div>
                            </div>

                            <div className="p-3 shadow-md rounded-2xl">
                                <div className="font-semibold">Frequency</div>
                                <div className="flex flex-wrap gap-3">
                                    <CheckBox name="Morning" title="Morning" id="morning" />
                                    <CheckBox name="Afternoon" title="Afternoon" id="afternoon" />
                                    <CheckBox name="Evening" title="Evening" id="evening" />
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
                            <Button title="Add Medication" variant="primary" size="md" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
