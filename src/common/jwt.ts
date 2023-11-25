import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { UserInterface } from "../modules/User/model";
//import { UserInterface } from "../modules/User/model";
dotenv.config();

const SECRET = `${process.env.SECRET}`;

export interface AppRequest extends Request {
  user?: any;
}

export const generateToken = (user: UserInterface): string => {
  const token = jwt.sign(JSON.parse(JSON.stringify(user)), SECRET, {
    expiresIn: "24h",
  });
  return token;
};

export const authenticateJWT = (
  req: AppRequest,
  res: Response,
  next: NextFunction
): void | Response<any, Record<string, any>> => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authentication failed!" });
  }

  try {
    jwt.verify(token, SECRET, (err: Error | null, decoded: any): void => {
      if (err) {
        console.log(err.message);
        throw new Error(err.message);
      }
      req.user = decoded;
      next();
    });
  } catch (e) {
    return res.status(401).json({ message: "Authentication failed!" });
  }
};
