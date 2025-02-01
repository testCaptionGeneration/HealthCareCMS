
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DoctorSignUpModel } from "../models/DoctorSchema";


const JWT_SECRET = process.env.JWT_SECRET || "default-secret";


export const doctorSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, phone, position, password, dof, hospital } = req.body;

    
    const checkExistingDoctor = await DoctorSignUpModel.findOne({ email });
    if (checkExistingDoctor) {
      res.status(400).json({ message: "Doctor already exists" });
      return;
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new DoctorSignUpModel({
      fullName,
      email,
      phone,
      position,
      password: hashedPassword,
      dof,
      hospital,
    });

    const savedDoctor = await newDoctor.save();

    
    const token = jwt.sign(
      { id: savedDoctor._id, email: savedDoctor.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Doctor registered successfully", doctor: savedDoctor, token });
  } catch (error) {
    console.error("Error during doctor signup:", error);
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

    
    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    
    const token = jwt.sign(
      { id: doctor._id, email: doctor.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Signin successful", doctor, token });
  } catch (error) {
    console.error("Error during doctor signin:", error);
    res.status(500).json({ message: "Server error occurred", error });
  }
};
