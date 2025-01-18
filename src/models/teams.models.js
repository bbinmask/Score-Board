import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    enum: ["Batsman", "Bowler", "All-rounder", "Wicketkeeper"],
    required: true,
    default: "All-rounder",
  },
  bowling: {
    type: Boolean,
    default: false,
  },
  runs: {
    type: Number,
    default: 0,
  },
  out: {
    type: String,
    default: false,
  },
  playing: {
    type: Boolean,
    default: false,
  },

  status: {
    type: Boolean,
  },

  id: {
    type: Number,
    required: true,
  },
  fours: {
    type: Number,
    default: 0,
  },
  sixes: {
    type: Number,
    default: 0,
  },
  overs: {
    over: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 0,
    },
    dot: {
      type: Number,
      default: 0,
    },
    balls: {
      type: Number,
      default: 0,
    },
    maiden: {
      type: Number,
      default: 0,
    },
    runs: {
      type: Number,
      default: 0,
    },
    wicket: {
      type: Number,
      default: 0,
    },
  },
  balls: {
    type: Number,
    default: 0,
  },
});

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    players: [playerSchema],
    match: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Team = mongoose.models?.Team || mongoose.model("Team", teamSchema);

export default Team;
