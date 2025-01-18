import mongoose from "mongoose";

const relationshipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "rejected"],
      default: "requested",
    },
  },
  {
    timestamps: true,
  },
);

const Relationship = mongoose.model("Relationship", relationshipSchema);
