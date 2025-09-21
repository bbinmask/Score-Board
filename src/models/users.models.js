import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username for this user."],
    maxlength: [30, "Name cannot be more than 30 characters"],
  },

  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: [true, "Please provide an email for this user."],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  avatar: {
    type: String,
  },
  phone: {
    type: String,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  won: {
    type: Number,
    required: true,
    default: 0,
  },
  lost: {
    type: Number,
    required: true,
    default: 0,
  },
  tie: {
    type: Number,
    required: true,
    default: 0,
  },
  trophies: {
    type: Number,
    required: true,
    default: 0,
  },

  totalMatches: {
    type: Number,
    required: true,
    default: 0,
  },
});

userSchema.index({ username: 1 }); // Index on username
userSchema.index({ email: 1 }); // Index on email for authentication

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      password: this.password,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      password: this.password,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
