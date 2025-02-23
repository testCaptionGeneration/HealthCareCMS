import mongoose, { Schema, model, ObjectId } from "mongoose"

const PatientSchema = new Schema({
    name: String,
    age: Number,
    birth: String,
    gender: String,
    number: String,
    date: { type: Date, default: Date.now() },
    // userId:{type:mongoose.Types.ObjectId, required:true}
});



const MedicationScehma = new Schema({
    prescriptionId: { type: mongoose.Types.ObjectId,required:true },
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

const DiseaseSchema=new Schema({
    doctorId:{type:mongoose.Types.ObjectId, required:true},
    patientId:{type:mongoose.Types.ObjectId, required:true},
    disease:String,
    severity:String
})

const Prescirption=new Schema({
    doctorName:{type:String, required:true}, 
    patientName:{type:String, required:true},
    doctorId:{type:mongoose.Types.ObjectId, required:true},
    patientId:{type:mongoose.Types.ObjectId, required:true},
    date:{type:Date, default:new Date(Date.now()), reqired:true},
})

const TreatmentSchema=new Schema({
    prescriptionId:{type:mongoose.Types.ObjectId, required:true},
    content:{type:String, required:true, trim:true}
})

export const PatientModel = model("patient", PatientSchema);
export const MedicationModel = model("Medication", MedicationScehma);
export const DiseaseModel=model("Disease",DiseaseSchema);
export const PrescirptionModel=model("Prescirption",Prescirption);
export const TreatmentModel=model("Treatment",TreatmentSchema);
