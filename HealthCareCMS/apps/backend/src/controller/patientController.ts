import { Request, Response } from "express";
import { PatientSignUpModel } from "../models/PatientSchema";


export const patientSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, phone, email, password } = req.body;

  
    const existingPatient = await PatientSignUpModel.findOne({ email });
    if (existingPatient) {
      res.status(400).json({ message: "Patient already exists" });
      return;
    }

   
    const newPatient = new PatientSignUpModel({
      fullName,
      phone,
      email,
      password,
    });

    const savedPatient = await newPatient.save();
    res.status(201).json({
      message: "Patient registered successfully",
      patient: savedPatient,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error occurred", error });
  }
};


export const patientSignin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

   
    const patient = await PatientSignUpModel.findOne({ email });
    if (!patient) {
      res.status(404).json({ message: "Patient does not exist" });
      return;
    }

    
    if (patient.password !== password) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    res.status(200).json({ message: "Patient signed in successfully", patient });
  } catch (error) {
    res.status(500).json({ message: "Server error occurred", error });
  }
};