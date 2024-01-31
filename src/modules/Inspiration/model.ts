import mongoose, { Document, Schema } from "mongoose";

interface IInspiration extends Document {
  userId: string;
  postId: string;
}

export interface InspirationInterface {
  _id?: string | Schema.Types.ObjectId;
  userId: string;
  postId: string;
}

const InspirationSchema = new Schema<IInspiration>({
  userId: {
    type: String,
    required: true,
  },

  postId: {
    type: String,
    required: true,
  },
});

const Inpiration = mongoose.model<IInspiration>(
  "Inspiration",
  InspirationSchema
);

export default Inpiration;
