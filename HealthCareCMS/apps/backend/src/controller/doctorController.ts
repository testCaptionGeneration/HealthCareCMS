import { Request, Response } from "express";
import { DoctorSignUpModel } from "../models/DoctorSchema";


export const doctorSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, phone, position, password } = req.body;

    
    const checkExistingDoctor = await DoctorSignUpModel.findOne({ email });
    if (checkExistingDoctor) {
      res.status(400).json({ message: "Doctor already exists" });
      return;
    }

    
    const newDoctor = new DoctorSignUpModel({
      fullName,
      email,
      phone,
      position,
      password,
    });

    const savedDoctor = await newDoctor.save();
    res.status(201).json({
      message: "Doctor registered successfully",
      doctor: savedDoctor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error occurred", error });
  }
};


export const doctorSignin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    
    const doctor = await DoctorSignUpModel.findOne({ email });
    if (!doctor) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }

    
    if (doctor.password !== password) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    res.status(200).json({ message: "Signin successful", doctor });
  } catch (error) {
    res.status(500).json({ message: "Server error occurred", error });
  }
};