"use server";

import mongoose from "mongoose";

export default async () => {
  try {
    const DB_OPTIONS = {
      dbName: process.env.DBNAME,
      user: process.env.DBUSERNAME,
      pass: process.env.DBPASSWORD,
      authSource: "admin",
    };
    await mongoose.connect(process.env.MONGODB_URI, DB_OPTIONS);
    console.warn("Connected Successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
