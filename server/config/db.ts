import mongoose, { MongooseError } from "mongoose";

const connectDB = async () => {
  try {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error(
        "DATABASE_URL is not defined in the environment variables."
      );
    }

    mongoose.set("strictQuery", true);

    await mongoose.connect(databaseUrl);

    console.log("[DATABASE] MongoDB connected...");
  } catch (error) {
    console.error(`[DATABASE] ${(error as MongooseError).message}`);
    process.exit(1);
  }
};

export default connectDB;
