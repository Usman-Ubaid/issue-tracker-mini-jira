import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
    console.log("Database connected Successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
