import express, { Request } from "express"
import dotenv from 'dotenv'
dotenv.config();
const app = express();
const port: number = 3000;
import mongoose from "mongoose";
import cors from 'cors';
import http from "http";
import {WebSocketServer, WebSocket} from "ws";
import bodyParser from "body-parser";
const Router = express.Router();

import doctorrouter from "./Routes/doctor";
import patientrouter from "./Routes/patient";

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
import { doctorRouter } from "./Routes/mainDoctor";
import { prescriptionRouter } from "./Routes/prescirption";
app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174","http://localhost:5175"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api/doctors", doctorrouter);
app.use("/api/patients", patientrouter);

const db_url = process.env.MONGO_URL;
app.use('/cms/v1/doctor', doctorRouter);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const activeConnections: { [patientId: string]: WebSocket |null } = {};
const accessRequests: { [key: string]: boolean } = {};

wss.on("connection", (ws:WebSocket, req) => {
  const url = new URL(req.url ?? "", `http://${req.headers.host}`);
  const patientId = url.searchParams.get("patientId");

  if (patientId) {
    activeConnections[patientId] = ws;

    ws.on("close", () => {
      delete activeConnections[patientId];
    });
  }
});

async function main() {
  await mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connection eshatablished with database")).catch((e) => console.log(e));

  app.listen(port, () => console.log(`App listening to ${process.env.PORT}`));
}
main();