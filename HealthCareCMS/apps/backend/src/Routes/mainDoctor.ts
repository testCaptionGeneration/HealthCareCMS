import express, { Router } from "express";
import { AllowedDoctorModel,DiseaseModel, MedicationModel, PatientModel, PostDiseasesModel, PrescirptionModel,TreatmentModel } from "../db";

import { stringify } from "querystring";
const doctorRouter = Router();
import mongoose from "mongoose";

import { DoctorModel, TrimmedDoctorModel } from "../models/DoctorSchema";
import { Request, Response } from "express";
const app=express();
const cors = require('cors');
app.use(cors());
import { ParsedQs } from "qs";
import { doctorSignupSchema } from "../validation";
import doctorrouter from "./doctor";


// app.use('/prescription',prescriptionRouter);

doctorRouter.post('/patient', async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const DateOfBirth = req.body.birth;
    const number = req.body.number

    try {
        const newPatient = await PatientModel.create({
            name,
            age,
            gender,
            birth: DateOfBirth,
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


doctorRouter.post("/allowed", async (req: Request, res: Response): Promise<void> => {
    try {
        const { patientId, doctorId } = req.body;
        console.log(patientId, doctorId);
        if (!patientId || !doctorId) {
          res.status(400).json({ error: "Patient ID and Doctor ID are required" });
          return;
        }
    
        
    
       const check=await AllowedDoctorModel.findOne({ allowedDoctor:doctorId,patientadds:patientId});
       if(!check){
           await AllowedDoctorModel.create({
               allowedDoctor:doctorId,
               patientadds:patientId
           })

           
       }

    
        res.json({ message: "Doctor access granted successfully" });
      } catch (error) {
        console.error("Error allowing doctor access:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });


    doctorRouter.delete("/remove", async (req: Request, res: Response): Promise<void> => {
        try {
          const { patientId, doctorId } = req.body;
      
          if (!patientId || !doctorId) {
             res.status(400).json({ error: "Patient ID and Doctor ID are required" });
                return;
            }
      
          const patient = await PatientModel.findById(patientId);
          if (!patient) {
             res.status(404).json({ error: "Patient not found" });
                return;
            }
      
          // Remove the doctorId from AllowedDoctorIds
          //@ts-ignore
          patient.AllowedDoctorIds = patient.AllowedDoctorIds.filter(id => !id.equals(doctorId));
          
          await patient.save();
      
          res.json({ message: "Doctor access removed successfully" });
        } catch (error) {
          console.error("Error removing doctor access:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      });
      

  
  

doctorRouter.get('/patientDetails/:id', async (req, res) => {
    try {
        const prescirptionId = req.params.id;
        const newPatient = await PatientModel.findOne({
            _id: prescirptionId
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
    const doctorId = req.body.doctorId;
    const patientId = req.body.patientId;
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
            doctorId,
            patientId,
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

doctorRouter.post('/treatmentcontent', async (req, res) => {
    const prescriptionId = req.body.prescriptionId;
    const treatmentcontent = req.body.content;

    try {
        await TreatmentModel.create({
            prescriptionId,
            content: treatmentcontent
        })
        res.json({
            message: "Treatment Added"
        })
    }
    catch (e) {
        res.status(500).json({
            message: e
        })
    }
})

doctorRouter.get('/treatment/:prescriptionId', async (req, res) => {
    try {
        const prescriptionId = req.params.prescriptionId;
        const treatment = await TreatmentModel.findOne({ prescriptionId });
        res.json({
            treatment: treatment
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


doctorRouter.post('/disease', async (req, res) => {
    try {
        const { disease, severity, patientId, doctorId } = req.body;

        await DiseaseModel.create({
            doctorId,
            patientId,
            disease,
            severity
        });

        res.status(200).json({
            message: "Disease Added"
        })
    }
    catch (error) {
        res.status(502).json({
            message: `An error occured : ${error}`
        })
    }   
})

doctorRouter.get('/search/:phone/:dob', (req, res) => {
    try {
        const phoneNumber = req.params.phone;
        const DateOfBirth = req.params.dob;

        const regex = new RegExp('^' + DateOfBirth);
        PatientModel.findOne({
            phone: phoneNumber,
            dob: regex
        }).then((result) => {
            res.json({
                result
            })
        })
    } catch (error) {
        res.json({
            error
        })
    }
})


doctorRouter.post('/prescription/presId', async (req, res) => {

    try {
        const doctorId = req.body.doctorId;
        const doctorName = req.body.doctorName;
        const patientName = req.body.patientName;
        const patientId = req.body.patientId;
        const date = new Date();
        date.setMinutes(date.getMinutes() + 330);

        const response = await PrescirptionModel.create({
            doctorId,
            doctorName,
            patientName,
            patientId,
            date: date
        })

        res.json({
            response
        })
    }
    catch (e) {
        res.status(500).json({
            message: e
        })
    }
})



doctorRouter.get('/prescription/:presId', async (req, res) => {
    const prescirptionId = req.params.presId;
    try {
        const response = await PrescirptionModel.findOne({
            _id: prescirptionId
        })
        res.json({
            response
        })
    }
    catch (e) {
        res.status(500).json({
            message: e
        })
    }
})

doctorRouter.get('/prescription/patient/:patientId', async (req: Request, res: Response) => {
    const patientId: string = req.params.patientId;
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 5;
     
    try {
        const response = await PrescirptionModel.find({ patientId })
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({ response, currentPage: page, hasMore: response.length === limit });
    } catch (error) {
        res.status(500).json({ message: error});
    }
});

doctorRouter.get('/prescription/doctor/:doctorId', async (req, res) => {
    const doctorId = req.params.doctorId;

    try {
        const response = await PrescirptionModel.find({
            doctorId: doctorId
        })

        res.json({
            response
        })
    }
        catch(error){
            res.json({
                message: error
            })
        }
})

doctorRouter.get('/prescription/doctorname/:doctorId', async (req, res) => {

    const doctorId = req.params.doctorId;

    try {
        const response = await DoctorModel.findOne({
            _id: doctorId
        })

        if (response) {
            const name = response.fullName;
            res.json({
                name
            })
        } else {
            res.status(404).json({
                message: "Doctor not found"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

)
doctorRouter.get('/prescription/patientname/:patientId', async (req, res) => {
    const patientId = req.params.patientId;

    try {
        const response = await PatientModel.findOne({
            _id: patientId
        })
        if (response) {
            res.json({
                response
            })

        }
    }
    catch (error) {
        res.status(500).json({
            message: error
        })
    }
})


const getDiseases = async (req: Request, res: Response): Promise<void> => {
    try {
        const searchQuery = req.params.searchQuery;

        const diseases = await DiseaseModel.find({
            disease: { $regex: new RegExp(searchQuery, 'i') } 
        });

        if (!diseases.length) {
            res.status(404).json({ message: "No matching diseases found" });
            return; 
        }

        res.json({ diseases });
    } catch (error) {
        res.status(500).json({ message: `An error occurred: ${error}` });
    }
};


doctorRouter.get('/disease/:searchQuery', getDiseases);

doctorRouter.post("/postdiseases", async (req: Request, res: Response): Promise<void> => {
    try {
        const { disease, severity, doctorId,prescriptionId } = req.body;

        if (!disease || !severity || !doctorId||!prescriptionId) {
            res.status(400).json({ message: "All fields are required: disease, severity, doctorId." });
            return;
        }

        if (!mongoose.isValidObjectId(doctorId)) {
            res.status(400).json({ message: "Invalid doctorId format." });
            return;
        }
        if(!mongoose.isValidObjectId(prescriptionId)){
            res.status(400).json({message:'Invalid Prescription Id'});
        }

        await PostDiseasesModel.create({
            doctorId: new mongoose.Types.ObjectId(doctorId),
            disease,
            severity,
            prescriptionId
        });

        res.status(201).json({ message: "Disease added successfully" });

    } catch (error) {
        res.status(500).json({ message: `An error occurred: ${error}` });
    }
});

doctorRouter.get('/postdiseases', async (req: Request, res: Response): Promise<void> => {
    try {
        const diseaseData = await PostDiseasesModel.find();
        
        if (!diseaseData || diseaseData.length === 0) {
            res.status(404).json({ message: 'No disease data found' });
            return;
        }

        res.status(200).json(diseaseData);
    } catch (error) {
        console.error('Error fetching disease data:', error);
        res.status(500).json({ 
            message: 'Error fetching disease details',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

doctorRouter.get('/prescription/diseases/:prescriptionId', async (req, res) => {
    const prescirptionId=req.params.prescriptionId;

    try {
        const response = await PostDiseasesModel.find({
            prescriptionId: prescirptionId
        })

        const disease=response.map((disease)=>{
            return disease.disease
        });

        res.json({
            disease
        })
    }
    catch (error) {
        res.json({
            message: error
        })
    }
})





const getDoctors = async (req: Request, res: Response): Promise<void> => {
    try {
        const searchQuery = req.params.searchQuery;

        const doctors = await DoctorModel.find({
            fullName: { $regex: new RegExp(searchQuery, 'i') }
        });
        

        if (!doctors.length) {
            res.status(404).json({ message: "No matching diseases found" });
            return; 
        }

        res.json({ doctors });
    } catch (error) {
        res.status(500).json({ message: `An error occurred: ${error}` });
    }
};

doctorRouter.get('/doctors/:searchQuery', getDoctors);

doctorRouter.get('/hospitals/:searchQuery',(req,res)=>{
    try {
        const searchQuery = req.params.searchQuery;
        DoctorModel.find({
            hospitalName: { $regex: new RegExp(searchQuery, 'i') }
        }).then((result) => {
            res.json({
                result
            })
        })
    } catch (error) {
        res.json({
            error
        })
    }
})


export default doctorRouter;









export { doctorRouter };