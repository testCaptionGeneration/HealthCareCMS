import express from "express";
import cors from "cors";
import connectDB from "./db/dbconnection"; 
import doctorRoutes from "./routes/doctor";
import patientRoutes from "./routes/patient";

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));


app.use(express.json());


connectDB();


app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});