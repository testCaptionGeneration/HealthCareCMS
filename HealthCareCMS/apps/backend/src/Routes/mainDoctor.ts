import express, { Router } from "express";
import { MedicationModel, PatientModel } from "../db";
import { stringify } from "querystring";
const doctorRouter = Router();
import mongoose from "mongoose";
doctorRouter.post('/patient', async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const DateOfBirth = req.body.birth;
    const disease = req.body.disease;
    const severity = req.body.severity;
    const number = req.body.number

    try {
        const newPatient = await PatientModel.create({
            name,
            age,
            gender,
            birth: DateOfBirth,
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

doctorRouter.post('/medication', async (req, res) => {

    const prescriptionId = req.body.prescriptionId;
    const medication = req.body.medication;
    const dose = req.body.dose;
    const doseUnit = req.body.doseUnit;
    const duration = req.body.duration;
    const durationUnit = req.body.durationUnit;
    const morning = req.body.morning;
    const afternoon = req.body.afternoon;
    const evening = req.body.evening;
    const mealStatus = req.body.mealStatus;

    try {
        const newMedication = await MedicationModel.create({
            prescriptionId,
            medication,
            dose,
            doseUnit,
            duration,
            durationUnit,
            morning,
            afternoon,
            evening,
            mealStatus
        })

        res.json({
            message: "Medication Added"
        })
    }
    catch (error) {
        res.status(520).json({
            message: `An unknown error occured ${error}`
        })
    }
})

doctorRouter.get('/medications/:prescriptionId', async (req, res) => {
    try {
        const prescriptionId = req.params.prescriptionId;
        const medication = await MedicationModel.find({ prescriptionId });
        res.json({
            medication: medication
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "error fetching medication"
        })
    }
})


doctorRouter.delete('/medication/:medicineId', async (req, res) => {
    try {
        const { medicineId } = req.params;



        const result = await MedicationModel.deleteOne({ _id: medicineId });

        if (result.deletedCount === 0) {
            res.status(404).json({ Message: "Medicine not found" });
        }

        res.json({ Message: "Medicine Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ Message: `An error occurred while deleting medicine: ${error}` });
    }
});

export { doctorRouter };