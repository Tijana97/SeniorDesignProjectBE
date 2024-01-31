import mongoose, { Document, Schema } from "mongoose";

interface ILike extends Document {
  userId: string;
  postId: string;
}

export interface LikeInterface {
  _id?: string | Schema.Types.ObjectId;
  userId: string;
  postId: string;
}

const LikeSchema = new Schema<ILike>({
  userId: {
    type: String,
    required: true,
  },

  postId: {
    type: String,
    required: true,
  },
});

const Like = mongoose.model<ILike>("Like", LikeSchema);

export default Like;
