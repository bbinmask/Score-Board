import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect.js";
import jwt from "jsonwebtoken";
import User from "@/models/users.models.js";

export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const userId = await req.cookies.get("user-id")?.value;

    if (!id) {
      return NextResponse.json({
        status: 404,
        message: "Bad request",
      });
    }

    const loggedInUser = await User.findById(userId);
    const requestedUser = await User.findById(id);

    const alreadyFollowing = loggedInUser.following.includes(id);
    const alreadyFriends = loggedInUser.friends.includes(id);
    const alreadyRequested = requestedUser.friendRequests.includes(userId);

    return NextResponse.json({
      status: 200,
      alreadyFollowing,
      alreadyFriends,
      alreadyRequested,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
