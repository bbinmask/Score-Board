import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  won: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  lose: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
});

export const Match =
  mongoose.models.Match || mongoose.model("Match", matchSchema);
