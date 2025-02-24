import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PatientModel } from "../models/PatientSchema"; // ✅ Use the correct Mongoose model
import { signinSchema, patientSignupSchema } from "../zod/validation";
const JWT_SECRET = process.env.JWT_SECRET || "default-secret";

export const patientSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const parsedBody = patientSignupSchema.parse(req.body);
    const { fullName, phone, email, password,dob} = parsedBody;

    
    const existingPatient = await PatientModel.findOne({ email });
    if (existingPatient) {
      res.status(400).json({ message: "Patient already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new PatientModel({
      fullName,
      phone,
      email,
      password: hashedPassword,
      dob
    });

    const savedPatient = await newPatient.save();

    const token = jwt.sign({ id: savedPatient._id, email: savedPatient.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "Patient registered successfully",
      patient: {
        id: savedPatient._id,
        fullName: savedPatient.fullName,
        email: savedPatient.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error during patient signup:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};


export const patientSignin = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedBody = signinSchema.parse(req.body);
    const { email, password } = parsedBody;

    const patient = await PatientModel.findOne({ email });
    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    const token = jwt.sign({ id: patient._id, email: patient.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Signin successful",
      patient: {
        id: patient._id,
        fullName: patient.fullName,
        email: patient.email,
      
        phone:patient.phone,
      },
      token,
    });
  } catch (error) {
    console.error("Error during patient signin:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};


export const patientdetails = async (req: Request, res: Response): Promise<void> => {
  const {phone}=req.params;
 
  try{
   const patients=await PatientModel.find({phone});
   if(patients.length==0){
    res.status(404).json({message:"no patients found"});
   }
   res.json(patients);
  }
  catch(error){
res.status(500).json({message:"error fetching "})
  }
 
}