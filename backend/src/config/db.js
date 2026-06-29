import mongoose from "mongoose";

/* Non srv connection - Because Connection non established */
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection Established Successfully");
  } catch (error) {
    console.log("Connection Error!", error.message);
    process.exit(1);
  }
};
