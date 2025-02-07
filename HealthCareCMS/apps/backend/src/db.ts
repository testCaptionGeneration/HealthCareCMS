import mongoose, { Schema, model, ObjectId } from "mongoose"

const PatientSchema = new Schema({
    name: String,
    age: Number,
    birth: String,
    gender: String,
    disease: String,
    severity: String,
    number: String,
    date: { type: Date, default: Date.now() },
    // userId:{type:mongoose.Types.ObjectId, required:true}
});



const MedicationScehma = new Schema({
    prescriptionId: { type: mongoose.Types.ObjectId, required: true },
    medication: String,
    dose: Number,
    doseUnit: String,
    duration: Number,
    durationUnit: String,
    morning: Boolean,
    afternoon: Boolean,
    evening: Boolean,
    mealStatus: String
})

export const PatientModel = model("patient", PatientSchema);
export const MedicationModel = model("Medication", MedicationScehma);
