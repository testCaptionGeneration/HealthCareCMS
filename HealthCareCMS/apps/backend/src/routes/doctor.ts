import express from "express";
import { doctorSignup, doctorSignin } from "../controller/doctorController";

const router = express.Router();


router.post("/signup", doctorSignup);


router.post("/signin", doctorSignin);

export default router;