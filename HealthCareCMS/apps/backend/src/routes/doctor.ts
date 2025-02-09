import express from "express";
import { doctorSignup, doctorSignin } from "../controller/doctorController";
import { validateRequest } from "../Middleware/ValidateRequest";
import { doctorSignupSchema, signinSchema } from "../../../shared/validation"

const doctorrouter = express.Router();

doctorrouter.post("/signup", validateRequest(doctorSignupSchema), doctorSignup);
doctorrouter.post("/signin", validateRequest(signinSchema), doctorSignin);

export default doctorrouter;