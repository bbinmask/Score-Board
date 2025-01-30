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

    const loggedInUser = await User.findById(userId);
    const requestedUser = await User.findById(requestedUserId);

    if (!loggedInUser || !requestedUser)
      return NextResponse.json({
        status: 404,
        message: "Bad request 404",
        subMessage: "Make sure you are logged in",
      });

    const alreadyFriends = await requestedUser.friends.findIndex(
      (id) => id.toString() === userId.toString(),
    );

    const already = await requestedUser.friends.includes(userId.toString());

    if (alreadyFriends !== -1) {
      requestedUser.friends = await requestedUser.friends.filter(
        (id) => id.toString() !== userId.toString(),
      );

      loggedInUser.friends = await loggedInUser.friends.filter(
        (id) => id.toString() !== requestedUser.toString(),
      );
      await requestedUser.save();
      await loggedInUser.save();

      return NextResponse.json({
        status: 201,
        alreadyFriends: false,
      });
    }
    await loggedInUser.friends.push(requestedUserId);
    await requestedUser.friends.push(userId);
    loggedInUser.friendRequests = await loggedInUser.friendRequests.filter(
      (id) => id.toString() !== requestedUserId.toString(),
    );
    requestedUser.friendRequests = await requestedUser.friendRequests.filter(
      (id) => id.toString() !== userId.toString(),
    );

    await requestedUser.save();
    await loggedInUser.save();

    return NextResponse.json({
      status: 201,
      alreadyFriends: true,
      friendRequests: loggedInUser.friendRequests,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

// export async function POST(req) {
//   await dbConnect();
//   try {
//     const { requestedUserId } = await req.json();
//     const userId = await req.cookies.get("user-id")?.value;
//     if (!requestedUserId || !userId)
//       return NextResponse.json({ status: 404, message: "Bad request 404" });

//     const loggedInUser = await User.findById(userId);
//     const requestedUser = await User.findById(requestedUserId);

//     if (!loggedInUser || !requestedUser)
//       return NextResponse.json({
//         status: 404,
//         message: "Bad request 404",
//         subMessage: "Make sure you are logged in",
//       });

//     await loggedInUser.friends.push(requestedUserId);
//     await requestedUser.friends.push(userId);

//     requestedUser.friends = await requestedUser.friends.filter(
//       (id) => id.toString() !== userId.toString(),
//     );

//     loggedInUser.friends = await loggedInUser.friends.filter(
//       (id) => id.toString() !== userId.toString(),
//     );
//     await requestedUser.save({ validateBeforeSave: false });
//     await loggedInUser.save({ validateBeforeSave: false });

//     return NextResponse.json({
//       status: 201,
//       alreadyFriends: true,
//       friendRequests: loggedInUser.friendRequests,
//     });
//   } catch (error) {
//     return NextResponse.json({ status: 500, message: error.message });
//   }
// }
