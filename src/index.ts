import express, { NextFunction, Request, Response } from "express";
import * as bodyParser from "body-parser";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
import { AppRequest, authenticateJWT } from "./common/jwt";
import router from "./modules/router";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { Multer } from "multer";
import sharp from "sharp";
import * as path from "path";
import multer from "multer";
import { PostInterface } from "./modules/Post/model";
import postRepository from "./modules/Post/repository";
import multerS3 from "multer-s3";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const app = express();
const PORT = "8080";

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey!,
    secretAccessKey: secretAccessKey!,
  },
  region: bucketRegion!,
});

const storage = multer.memoryStorage();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CreationCloud",
      version: "1.0.0",
      description: "Web application for sharing inspiration.",
      contact: {
        name: "Tijana Burazorovic",
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

const generateFileName = () => {
  const name = Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";

  return name;
};

var upload = multer({
  storage: storage,
  limits: {
    fields: 5,
    fieldNameSize: 50, // TODO: Check if this size is enough
    fieldSize: 20000, // TODO: Check if this size is enough
    // TODO: Change this line after compression
    fileSize: 15000000, // 150 KB for a 1080x1080 JPG 90
  },
  fileFilter: function (_req, file, cb) {
    try {
      checkFileType(file);
      cb(null, true);
    } catch (error: any) {
      cb(error.message, false);
    }
  },
});

function checkFileType(file: Express.Multer.File) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (!(mimetype && extname)) {
    throw new Error("Invalid file type");
  }
}

app.post(
  "/profile-upload-single",
  authenticateJWT,
  upload.single("profile-file"),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Bilo sta", req.file);
      if (req.file) {
        console.log(JSON.stringify(req.file));
        const fileBuffer = await sharp(req.file.buffer).toBuffer();
        var fileName = generateFileName();
        const uploadParams = {
          Bucket: bucketName!,
          Body: fileBuffer,
          Key: fileName,
          ContentType: req.file.mimetype,
        };
        await s3.send(new PutObjectCommand(uploadParams));
        console.log("Treci: ", fileName);
        const postData: PostInterface = {
          userId: req.body.userId,
          title: req.body.title,
          description: req.body.description,
          tags: req.body.tags.split(","),
          creationDate: new Date(),
          imageURL: fileName,
        };
        console.log("cetvrti: ", postData);
        const createdPost = await postRepository.createPost(postData);
        return res.status(201).json(createdPost);
      } else {
        return res.status(400).json({ error: "No file uploaded" });
      }
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

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
