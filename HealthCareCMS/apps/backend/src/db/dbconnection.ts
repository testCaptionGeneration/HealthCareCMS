import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURL: string = process.env.dburl as string; 
    if (!mongoURL) {
      throw new Error("MongoDB URL is not defined in environment variables.");
    }
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected successfully to HealthCareCMS");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
};

export default connectDB;