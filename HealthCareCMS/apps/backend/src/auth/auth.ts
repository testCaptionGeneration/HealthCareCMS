import { z } from "zod";
import { doctorSignupSchema } from "../../../shared/validation"; 
import { signinSchema } from "../../../shared/validation"; 


export type SignupFormData = z.infer<typeof doctorSignupSchema>; 
export type SigninFormData = z.infer<typeof signinSchema>;
