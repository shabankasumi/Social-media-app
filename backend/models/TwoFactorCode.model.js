import mongoose, { Schema } from "mongoose";

const twoFactorCode = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const TwoFactorCode = mongoose.model("TwoFactorCode", twoFactorCode);
