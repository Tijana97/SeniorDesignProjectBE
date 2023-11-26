import mongoose, { Document, Schema } from "mongoose";

/* const Tag = {
  storage: "storage",
  decoration: "decoration",
  renovation: "renovation",
  cooking: "cooking",
  plants: "plants",
  clothes: "clothes",
  design: "design",
  painting: "painting",
  nature: "nature",
  art: "art",
  interior: "interior",
  animals: "animals",
}; */

interface IPost extends Document {
  userId: string;
  title: string;
  description: string;
  tags: Array<string>;
  imageURL: string;
  creationDate: Date;
}

export interface PostInterface {
  _id?: string | Schema.Types.ObjectId;
  userId: string;
  title: string;
  description: string;
  tags: Array<string>;
  imageURL: string;
  creationDate: Date;
}

const PostSchema = new Schema<IPost>({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
  imageURL: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
  },
});

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
