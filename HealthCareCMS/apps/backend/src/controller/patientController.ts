import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PatientSignUpModel } from "../models/PatientSchema";


const JWT_SECRET = process.env.JWT_SECRET || "default-secret";


export const patientSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, phone, email, password, hospital } = req.body;

    
    const existingPatient = await PatientSignUpModel.findOne({ email });
    if (existingPatient) {
      res.status(400).json({ message: "Patient already exists" });
      return;
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new PatientSignUpModel({
      fullName,
      phone,
      email,
      password: hashedPassword,
      hospital,
    });

    const savedPatient = await newPatient.save();

    
    const token = jwt.sign(
      { id: savedPatient._id, email: savedPatient.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Patient registered successfully", patient: savedPatient, token });
  } catch (error) {
    console.error("Error during patient signup:", error);
    res.status(500).json({ message: "Server error occurred", error });
  }
};


export const patientSignin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

   
    const patient = await PatientSignUpModel.findOne({ email });
    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    
    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    
    const token = jwt.sign(
      { id: patient._id, email: patient.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Signin successful", patient, token });
  } catch (error) {
    console.error("Error during patient signin:", error);
    res.status(500).json({ message: "Server error occurred", error });
  }
};