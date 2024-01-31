import mongoose, { Document, Schema } from "mongoose";

interface IComment extends Document {
  postId: string;
  userId: string;
  content: string;
}

export interface CommentInterface {
  _id?: string | Schema.Types.ObjectId;
  userId: string;
  postId: string;
  content: string;
}

export interface CommentResponse {
  _id?: string | Schema.Types.ObjectId;
  userId: string;
  postId: string;
  content: string;
  userFirstName: string;
  userLastName: string;
}

const CommentSchema = new Schema<IComment>({
  userId: {
    type: String,
    required: true,
  },

  postId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
