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
import * as path from "path";
import multer from "multer";
import { PostInterface } from "./modules/Post/model";
import postRepository from "./modules/Post/repository";

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

var storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const destinationPath = path.join(__dirname, "images");
    console.log("Path: ", destinationPath);
    cb(null, destinationPath);
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "-" + Math.round(Math.random() * 1e9)
    );
  },
});
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
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (!(mimetype && extname)) {
    throw new Error("Invalid file type");
  }
}

app.post(
  "/profile-upload-single",
  authenticateJWT,
  upload.single("profile-file"),
  /*function (req: Request, res: Response, next: NextFunction) {
    console.log("Prvi: ", req);
    try {
      if (req.file) {
        console.log("Drugi: ", req.file);
        console.log(JSON.stringify(req.file));
        var response = req.file.path;
        console.log("Treci: ", response);
        const postData: PostInterface = {
          title: req.body.title,
          description: req.body.description,
          tags: req.body.tags,
          creationDate: new Date(),
          imageURL: response,
        };
        console.log("cetvrti: ", postData);
        return console.log("Hajmo pls", response);
      } else {
        return res.status(400).json({ error: "No file uploaded" });
      }
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } */
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Bilo sta", req.file);
      if (req.file) {
        console.log("Drugi: ");
        console.log(JSON.stringify(req.file));
        var response = req.file.path;
        console.log("Treci: ", response);
        const postData: PostInterface = {
          userId: req.body.userId,
          title: req.body.title,
          description: req.body.description,
          tags: req.body.tags,
          creationDate: new Date(),
          imageURL: response,
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

/* app.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {
    // req.files is array of `profile-files` files
    // req.body will contain the text fields, if there were any
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    for(var i=0;i<req.files.length;i++){
        response += `<img src="${req.files[i].path}" /><br>`
    }
    
    return res.send(response)
}) */

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
