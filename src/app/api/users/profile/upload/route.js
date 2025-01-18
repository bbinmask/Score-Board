import fs from "fs";
import dbConnect from "@/lib/dbConnect";
import {
  createImageTag,
  getAssetInfo,
  uploadOnCloudinary,
} from "../../../../../utils/cloudinary";
import User from "@/models/users.models";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export const POST = async (req, res) => {
  await dbConnect();

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const id = formData.get("id");
    const byteImage = await file.arrayBuffer();
    const bufferImage = Buffer.from(byteImage);
    const path = `./public/uploads/${file.name}`;

    await writeFile(path, bufferImage);

    // Upload to Cloudinary
    const upload = await uploadOnCloudinary(path);

    // Check if the upload was successful
    if (!upload) {
      return NextResponse.json({ status: 400, error: "File upload failed" });
    }
    // Update the user's avatar in MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      id, // The ID of the user to update
      { avatar: upload.url }, // The new avatar URL from Cloudinary
      { new: true }, // Return the updated document
    ).select("-password -accessToken");

    if (!updatedUser) {
      return NextResponse.json({ status: 404, error: "User not found" });
    }

    return NextResponse.json({ status: 200, data: updatedUser });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      error: `The error is: ${error?.message}`,
    });
  }
};
