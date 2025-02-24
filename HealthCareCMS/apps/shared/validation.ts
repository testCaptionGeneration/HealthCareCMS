import { z } from "zod";

export const doctorSignupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, "Invalid phone number"),
  position: z.string().min(2, "Position is required"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[0-9]/, "Include at least one number"),
  dof: z.string().min(2, "Degree is required"),
  hospital: z.string().min(2, "Hospital name is required"),
});



export const patientSignupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"), // Exactly 10 digits, no spaces or country code
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[0-9]/, "Include at least one number"),
  dob: z
    .string()
    .refine((date) => {
      const enteredDate = new Date(date);
      const today = new Date();
      return enteredDate <= today; // Ensure DOB is not in the future
    }, "Date of Birth cannot be in the future"),
});





export const signinSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});
