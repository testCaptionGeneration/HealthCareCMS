
import mongoose, { Document } from "mongoose";

export interface PatientSignUp extends Document {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  hospital: string;
}

const PatientSignUpSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hospital: { type: String, required: true },
});

export const PatientSignUpModel = mongoose.model<PatientSignUp>(
  "PatientSignUp",
  PatientSignUpSchema
);
