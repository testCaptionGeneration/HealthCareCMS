import mongoose, { Schema, Document } from "mongoose";


export interface PatientSignUpSchema extends Document {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}


const PatientSignUpSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
});


export const PatientSignUpModel = mongoose.model<PatientSignUpSchema>(
  "PatientSignUp",
  PatientSignUpSchema
);