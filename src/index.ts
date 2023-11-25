import express, { NextFunction, Request, Response } from "express";
import * as bodyParser from "body-parser";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = "8080";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const connectDB = async () => {
  await mongoose.connect(`${process.env.DB_URI}`);
};

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("Server Started");
  });
};

const startApp = async () => {
  await startServer();
};

startApp();
