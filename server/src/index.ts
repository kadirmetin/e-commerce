import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "../config/db";
import { router } from "./routes/router";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/", router);

const PORT = process.env.PORT || 3001;

connectDB();

app.listen(PORT, () => {
  console.log(`[SERVER] Server started on port ${PORT}!`);
});
