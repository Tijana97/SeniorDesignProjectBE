import express, { NextFunction, Request, Response } from "express";
import * as bodyParser from "body-parser";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
import { AppRequest } from "./common/jwt";
import router from "./modules/router";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

dotenv.config();

const app = express();
const PORT = "8080";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },

    servers: [
      {
        url: "http://localhost:8080",
        description: "My API Documentation",
      },
    ],
  },
  apis: ["./modules/*.ts"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const useHandler =
  (fn: any) => (req: AppRequest | Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

app.use(function (
  err: any,
  req: AppRequest | Request,
  res: Response,
  next: NextFunction
) {
  res
    .status(err.status)
    .send({ message: err.status === 500 ? "Server Error" : err.message });
});

app.use("/", useHandler(router));

const connectDB = async () => {
  await mongoose.connect(`${process.env.DB_URI}`);
};

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("Server Started on ", PORT);
  });
};

const startApp = async () => {
  await startServer();
};

startApp();
