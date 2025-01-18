import { NextResponse } from "next/server";
import User from "../../../../models/users.models.js";
import dbConnect from "../../../../lib/dbConnect.js";
export async function GET(req) {
  await dbConnect();

  try {
    const userId = await req.cookies.get("user-id")?.value;

    // Find the user and populate the 'friendRequests' field with user details
    const user = await User.findById(userId).populate("friendRequests");

    if (!user) {
      return NextResponse.json({ status: 404, message: "User not found" });
    }

    return NextResponse.json({
      status: 200,
      friendRequests: user.friendRequests,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

export async function POST(req) {}
