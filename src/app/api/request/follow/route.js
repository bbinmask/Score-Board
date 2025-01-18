import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect.js";
import User from "../../../../models/users.models.js";
import jwt from "jsonwebtoken";
export async function GET(req) {}

export async function POST(req) {
  await dbConnect();

  try {
    const token = req.cookies.get("accessToken")?.value;
    const userId = req.cookies.get("user-id")?.value;
    const { id } = await req.json();
    if (!token) {
      return NextResponse.json({
        status: 404,
        message: "Check if you are not logged in!",
      });
    }

    const loggedInUser = await User.findById(userId);

    const targetedUser = await User.findById(id)?.select(
      "-password -refreshToken",
    );

    const alreadyFollwing = await targetedUser.followers.includes(
      loggedInUser._id,
    );
    if (alreadyFollwing) {
      targetedUser.followers = await targetedUser.followers.filter(
        (id) => id.toString() !== loggedInUser._id.toString(),
      );

      loggedInUser.following = await loggedInUser.following.filter(
        (id) => id.toString() !== targetedUser._id.toString(),
      );
      await targetedUser.save();
      await loggedInUser.save();
      return NextResponse.json({
        status: 200,
        alreadyFollwing: false,
        user: targetedUser,
      });
    }
    await targetedUser.followers.push(loggedInUser._id);
    await loggedInUser.following.push(targetedUser._id);
    await targetedUser.save();
    await loggedInUser.save();

    return NextResponse.json({
      status: 200,
      alreadyFollwing: true,
      user: targetedUser,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
