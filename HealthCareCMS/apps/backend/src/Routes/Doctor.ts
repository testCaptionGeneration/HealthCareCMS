import express, { Router } from "express";
import { PatientModel } from "../db";
import { stringify } from "querystring";
const doctorRouter = Router();

doctorRouter.post('/patient', async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const gender=req.body.gender;
    const DateOfBirth=req.body.birth;
    const disease = req.body.disease;
    const severity=req.body.severity;
    const number = req.body.number

    try {
        const newPatient = await PatientModel.create({
            name,
            age,
            gender,
            birth:DateOfBirth,
            disease,
            severity,
            number
        })

        res.json({
            message: "added",
            ObjectId: newPatient._id
        })
    }
    catch (error) {
        res.json({
            message: `an error occured ${error}`
        })
    }

})

doctorRouter.get('/patientDetails/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const newPatient = await PatientModel.findOne({
            _id: userId
        })

        if (!newPatient) {
            res.status(404).json({ message: "Not found" })
        }
        
        res.json({
            newPatient
        })
    } catch (error) {
        res.json({
            message: error
        })
    }

})

export { doctorRouter };