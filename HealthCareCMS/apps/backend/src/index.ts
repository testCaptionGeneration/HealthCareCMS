import express, { Request } from "express"
import dotenv from 'dotenv'
dotenv.config();
const app = express();
const port: number = 3000;
import mongoose from "mongoose";
import cors from 'cors'
const Router = express.Router();


import doctorrouter from "./routes/doctor";
import patientrouter from "./routes/patient";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;
    }
  }
  namespace Express {
    interface Request {
      userId: String
    }
  }
}

export { };


import { PatientModel } from "./db";
import { doctorRouter } from "./routes/mainDoctor";
app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api/doctors", doctorrouter);
app.use("/api/patients", patientrouter);


const db_url = process.env.MONGO_URL;
app.use('/cms/v1/doctor', doctorRouter);
console.log("MONGO_URL: JHJKHG", process.env.MONGO_URL);
async function main() {
  await mongoose.connect(db_url).then(() => console.log("Connection eshatablished with database")).catch((e) => console.log(e));

  app.listen(process.env.PORT, () => console.log(`App listening to ${process.env.PORT}`));
}
main();
















