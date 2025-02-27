import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DoctorModel, TrimmedDoctorModel } from "../models/DoctorSchema"; 
import { doctorSignupSchema, signinSchema } from "../zod/validation";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret";

export const doctorSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const parsedBody = doctorSignupSchema.parse(req.body);
    const { fullName, email, phone, position, password, dof, hospital } = parsedBody;

   
    const checkExistingDoctor = await DoctorModel.findOne({ email });
    if (checkExistingDoctor) {
      res.status(400).json({ message: "Doctor already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new DoctorModel({
      fullName,
      email,
      phone,
      position,
      password: hashedPassword,
      dof,
      hospital,
    });

    const savedDoctor = await newDoctor.save();

    const token = jwt.sign({ id: savedDoctor._id, email: savedDoctor.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "Doctor registered successfully",
      doctor: {
        id: savedDoctor._id,
        fullName: savedDoctor.fullName,
        email: savedDoctor.email,
        position: savedDoctor.position,
        hospital: savedDoctor.hospital,
      },
      token,
    });
  } catch (error) {
    console.error("Error during doctor signup:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const doctorSignin = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const parsedBody = signinSchema.parse(req.body);
    const { email, password } = parsedBody;

    
    const doctor = await DoctorModel.findOne({ email });
    if (!doctor) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    const token = jwt.sign({ id: doctor._id, email: doctor.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Signin successful",
      doctor: {
        id: doctor._id,
        fullName: doctor.fullName,
        email: doctor.email,
        position: doctor.position,
        hospital: doctor.hospital,
      },
      token,
    });
  } catch (error) {
    console.error("Error during doctor signin:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const doctorSignupTrimmed = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const parsedBody = doctorSignupSchema.parse(req.body);
    const { fullName, email, phone, position, password, dof, hospital } = parsedBody;

   
    const checkExistingDoctor = await TrimmedDoctorModel.findOne({ email });
    if (checkExistingDoctor) {
      res.status(400).json({ message: "Doctor already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new TrimmedDoctorModel({
      fullName,
      email,
      phone,
      position,
      password: hashedPassword,
      dof,
      hospital,
    });

    const savedDoctor = await newDoctor.save();

    const token = jwt.sign({ id: savedDoctor._id, email: savedDoctor.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "Doctor registered successfully",
      doctor: {
        id: savedDoctor._id,
        fullName: savedDoctor.fullName,
        email: savedDoctor.email,
        position: savedDoctor.position,
        hospital: savedDoctor.hospital,
      },
      token,
    });
  } catch (error) {
    console.error("Error during doctor signup:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

export const doctorSigninTrimmed= async (req: Request, res: Response): Promise<void> => {
  try {
    
    const parsedBody = signinSchema.parse(req.body);
    const { email, password } = parsedBody;

    
    const doctor = await TrimmedDoctorModel.findOne({ email });
    if (!doctor) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    const token = jwt.sign({ id: doctor._id, email: doctor.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Signin successful",
      doctor: {
        id: doctor._id,
        fullName: doctor.fullName,
        email: doctor.email,
        position: doctor.position,
        hospital: doctor.hospital,
      },
      token,
    });
  } catch (error) {
    console.error("Error during doctor signin:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};
