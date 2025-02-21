import express,{ Router } from "express";
import { PrescirptionModel } from "../db";
const app=express();
const prescriptionRouter = Router();
app.use(express.json());

prescriptionRouter.post('/presId', async (req, res) => {
    
    try{
    const doctorId=req.body.doctorId;
    const patientId=req.body.patientId; 

    const response=await PrescirptionModel.create({
        doctorId,
        patientId
    })
    const prescirptionId=response._id;
    res.json({
        prescirptionId
    })
    }
    catch(e){
        res.status(500).json({
            message:e
        })
    }
})

export { prescriptionRouter };