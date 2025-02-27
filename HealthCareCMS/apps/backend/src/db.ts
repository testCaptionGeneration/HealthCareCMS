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

const AllowedDoctorSchema = new mongoose.Schema({
    allowedDoctor: String,
    patientadds:String
});
export const AllowedDoctorModel = mongoose.model("AllowedDoctor", AllowedDoctorSchema);
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

const DiseaseSchema = new Schema({
    doctorId: { type: mongoose.Types.ObjectId, required: true, ref: "Doctor" },
    patientId: { type: mongoose.Types.ObjectId, required: true, ref: "Patient" },
    disease: { type: String, required: true, trim: true, lowercase: true },
    severity: { type: String, required: true, trim: true, lowercase: true }
});

const PostDisease = new mongoose.Schema({
    doctorId: { type: mongoose.Types.ObjectId, required: true, ref: "Doctor" },
    disease: { type: String, required: true, trim: true, lowercase: true },
    severity: { type: String, required: true, trim: true, lowercase: true },
    prescriptionId:{type:mongoose.Types.ObjectId,required:true,ref:'Prescription'}
});





const Prescirption=new Schema({
    doctorName:{type:String, required:true}, 
    patientName:{type:String, required:true},
    doctorId:{type:mongoose.Types.ObjectId, required:true},
    patientId:{type:mongoose.Types.ObjectId, required:true},
    date:{type:Date, default:new Date(Date.now()), required:true},
})

const TreatmentSchema=new Schema({
    prescriptionId:{type:mongoose.Types.ObjectId, required:true},
    content:{type:String, required:true, trim:true}
})

export const PatientModel = model("patient", PatientSchema);
export const MedicationModel = model("Medication", MedicationScehma);
export const DiseaseModel=model("Disease",DiseaseSchema);
export const PrescirptionModel=model("Prescirption",Prescirption);
export const PostDiseasesModel = model("PostDiseases",PostDisease) ;
export const TreatmentModel=model("Treatment",TreatmentSchema);
