import mongoose, { Document } from "mongoose";

export interface DoctorSignUp extends Document {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  password: string;
  dof: string;
  hospital: string;
}

const DoctorSignUpSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  password: { type: String, required: true },
  dof: { type: String, required: true },
  hospital: { type: String, required: true },
});

export const DoctorSignUpModel = mongoose.model<DoctorSignUp>(
  "DoctorSignUp",
  DoctorSignUpSchema
);