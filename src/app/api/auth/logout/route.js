import { NextResponse } from "next/server.js";
import dbConnect from "../../../../lib/dbConnect.js";
import User from "../../../../models/users.models.js";
export async function GET(req) {
  await dbConnect();

  const userId = req.cookies?.get("user-id")?.value;
  const token = req.cookies?.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({ status: 404, message: "Already logged out" });
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    },
  );

  const response = NextResponse.json({ status: 200, message: "OK" });
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  response.cookies.delete("user-id");
  return response;
}

export async function POST(req) {
  await dbConnect();
}
