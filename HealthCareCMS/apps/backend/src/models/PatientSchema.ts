import mongoose from "mongoose";
import { string } from "zod";
import { AllowedDoctorModel } from "../db";


const PatientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: String, required: true },
});



export const PatientModel = mongoose.model("Patient", PatientSchema);
