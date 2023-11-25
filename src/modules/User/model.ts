import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  username: string;
}

export interface UserInterface {
  _id?: string | Schema.Types.ObjectId;
  name: string;
  surname: string;
  email: string;
  password: string;
  username: string;
}

export interface LoginResponseInterface {
  token: string;
  expiresAt: string;
  user: UserInterface;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
