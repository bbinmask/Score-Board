import dbConnect from "../../../../lib/dbConnect.js";
import User from "../../../../models/users.models.js";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await dbConnect();

    const body = await req.json();

    const { username, fullName, email, password } = body;

    if ([username, fullName, email].some((field) => field?.trim() === "")) {
      return NextResponse.json({
        status: 404,
        message: "All fields required",
      });
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      return NextResponse.json({ emailAvailable: false });
    }

    const user = await User.create({
      username,
      password,
      fullName,
      email,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser)
      return NextResponse.json({
        status: 500,
        message: "Something went wrong!",
      });

    return NextResponse.json({ status: 201 }, { message: "OK" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Server Error" },
      { status: 500 },
    );
  }
};

export const GET = async (req) => {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    const user = await User.findOne({ username });

    if (!user) return NextResponse.json({ available: true }, { status: 200 });
    if (user) {
      return NextResponse.json({ available: false }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", error },
      { status: 500 },
    );
  }
};
