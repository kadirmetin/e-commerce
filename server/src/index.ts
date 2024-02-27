import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.get("/api", (req: Request, res: Response) => {
  return res.status(200).send({ response: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`[SERVER] Server started on port ${PORT}!`);
});
