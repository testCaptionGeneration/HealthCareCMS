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
   phone: z.string().regex(/^\+?[\d\s-]{10,}$/, "Invalid phone number"),
   password: z
     .string()
     .min(8, "Password must be at least 8 characters")
     .regex(/[A-Z]/, "Include at least one uppercase letter")
     .regex(/[0-9]/, "Include at least one number"),
   dob: z.string().date(),
 });


export const signinSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});
