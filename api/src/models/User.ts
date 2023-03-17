import mongoose, { Document } from "mongoose";

export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
};

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // unique: true,
    // required: true,
  },

  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});
export default mongoose.model<UserDocument>("User", UserSchema);
