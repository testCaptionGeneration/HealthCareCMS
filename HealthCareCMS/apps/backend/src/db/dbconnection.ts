import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURL = "mongodb+srv://mukeshpaliwal:4IFhHJmDCAhPwMMm@firstdb.5oexb.mongodb.net/HealthCareCMS"; 
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected successfully to HealthCareCMS");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
};

export default connectDB;
