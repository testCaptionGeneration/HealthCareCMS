import express from  "express"
import patientRouter from "./patient"

const router=express.Router();
router.use("/patient",patientRouter);
export  default router ;
