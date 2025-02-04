import express from "express";
import cors from "cors";
import connectDB from "./db/dbconnection";
import doctorrouter from "./routes/doctor";  
import patientrouter from "./routes/patient";  
import dotenv from "dotenv";

dotenv.config(); 

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

connectDB();

app.use("/api/doctors", doctorrouter);  
app.use("/api/patients", patientrouter);  

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
