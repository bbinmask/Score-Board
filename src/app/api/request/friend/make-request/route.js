import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect.js";
import User from "../../../../../models/users.models.js";
export async function GET(req) {}

export async function POST(req) {
  await dbConnect();
  try {
    const { requestedUserId } = await req.json();
    const userId = await req.cookies.get("user-id")?.value;

    if (!requestedUserId || !userId)
      return NextResponse.json({ status: 404, message: "Bad request 404" });

    const requestedUser = await User.findById(requestedUserId);
    const loggedInUser = await User.findById(userId);
    if (!requestedUser || !loggedInUser)
      return NextResponse.json({
        status: 404,
        message: "Bad request 404",
        subMessage: "Make sure you are logged in",
      });

    const alreadyRequested = await requestedUser.friendRequests.findIndex(
      (id) => id.toString() === userId.toString(),
    );
    const alreadyFriends = await requestedUser.friends.findIndex(
      (id) => id.toString() === userId.toString(),
    );

    if (alreadyRequested !== -1) {
      requestedUser.friendRequests = await requestedUser.friendRequests.filter(
        (id) => id.toString() !== userId.toString(),
      );
      await requestedUser.save();

      return NextResponse.json({
        status: 201,
        alreadyRequested: false,
        alreadyFriends: false,
      });
    }

    if (alreadyFriends !== -1) {
      requestedUser.friends = await requestedUser.friends.filter(
        (id) => id.toString() !== userId.toString(),
      );

      loggedInUser.friends = await loggedInUser.friends.filter(
        (id) => id.toString() !== userId.toString(),
      );
      await requestedUser.save();
      await loggedInUser.save();

      return NextResponse.json({
        status: 201,
        alreadyFriends: false,
        alreadyRequested: false,
      });
    }

    await requestedUser.friendRequests.push(userId);
    await requestedUser.save();

    return NextResponse.json({
      status: 201,
      message: "OK",
      alreadyRequested: true,
      alreadyFriends: false,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
