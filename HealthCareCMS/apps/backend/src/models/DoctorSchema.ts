import mongoose from "mongoose";


const DoctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true},
  phone: { type: String, required: true },
  position: { type: String, required: true },
  password: { type: String, required: true },
  dof: { type: String, required: true },
  hospital: { type: String, required: true },
});


export const DoctorModel = mongoose.model("Doctor", DoctorSchema);
