import User from "@/models/users.models";
import dbConnect from "../../../../lib/dbConnect";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req) {
  await dbConnect();

  const cookieStore = cookies();
  const userId = cookieStore.get("user-id")?.value;

  if (!userId) {
    return NextResponse.json({ message: "Token not available" });
  }

  try {
    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      return new NextResponse({
        status: 200,
        message: "Invalid request",
      });
    }

    return new NextResponse(JSON.stringify({ user }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Invalid token" }), {
      status: 401,
    });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();

    const {
      fullName,
      username,
      email,
      phone,
      newFullName,
      newUsername,
      newEmail,
      newPhone,
    } = body;

    if (email !== newEmail) {
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    }).select("-password -refreshToken");

    if (!user)
      return NextResponse.json({
        status: 404,
        message: "User not found.",
      });

    if (fullName !== newFullName && newFullName !== "") {
      user.fullName = newFullName;
    }

    if (email !== newEmail && newEmail !== "") {
      const email = newEmail;

      const existedEmail = await User.findOne({ email });

      if (existedEmail) {
        return NextResponse.json({ emailAvailable: false });
      }

      user.email = newEmail;
    }

    if (username !== newUsername && newUsername !== "") {
      user.username = newUsername;
    }

    if (phone !== newPhone && newPhone !== "") {
      const phone = newPhone;

      const existedPhone = await User.findOne({ phone });

      if (existedPhone) {
        return NextResponse.json({ phoneAvailable: false });
      }

      user.phone = newPhone;
    }

    await user.save({ validateBeforeSave: false });

    const updatedUser = await User.findById(user._id).select(
      "-password -refreshToken",
    );

    if (!updatedUser) {
      return NextResponse.json({
        status: 500,
        message: "Internal server error",
      });
    }

    return NextResponse.json({ user: updatedUser, status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 404, message: "Something went wrong" });
  }
}
