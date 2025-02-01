import express from "express";
import { patientSignup, patientSignin } from "../controller/patientController";

const router = express.Router();

router.post("/signup", patientSignup);
router.post("/signin", patientSignin);

export const patientRoutes = router; 