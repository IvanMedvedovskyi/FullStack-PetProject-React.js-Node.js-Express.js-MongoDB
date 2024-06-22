import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostSchema",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("UserSchema", UserSchema);
