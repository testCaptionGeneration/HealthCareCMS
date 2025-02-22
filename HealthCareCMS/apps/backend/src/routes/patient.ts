import express from "express";
import { patientSignup,patientSignin ,patientdetails} from "../controller/patientController";
import { validateRequest } from "../Middleware/ValidateRequest"; 
import { patientSignupSchema } from "../../../shared/validation"; 
import { signinSchema } from "../zod/validation";

const patientrouter = express.Router();

patientrouter.post("/signup", validateRequest(patientSignupSchema), patientSignup);
patientrouter.post('/signin',validateRequest(signinSchema),patientSignin);
patientrouter.get("/profile/:phone",patientdetails);
export default patientrouter;
