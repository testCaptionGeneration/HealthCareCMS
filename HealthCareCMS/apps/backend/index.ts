import express, { Express } from "express";
import cors from "cors";
import mainrouter from "./routes/index"; // Adjust path if needed

const app: Express = express(); // Explicitly type app

app.use(cors()); // Use CORS middleware
app.use(express.json()); // Parse JSON requests
app.use("/api/v1", mainrouter); // Use router

// Start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
