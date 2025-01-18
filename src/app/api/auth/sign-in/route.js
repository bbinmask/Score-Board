import dbConnect from "../../../../lib/dbConnect";
import User from "@/models/users.models";
import { NextResponse } from "next/server";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Something went wrong" });
  }
};

export async function GET(req) {
  try {
    await dbConnect();

    const users = await User.find({});

    return NextResponse.json({ status: 200 }, { data: users });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export const POST = async (req) => {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, password } = body;

    if (email === "") {
      return NextResponse.json({
        status: 404,
        message: "ALL FIELDS ARE REQUIRED!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) new Error("Email not registered! Sign up instead.");

    const passwordCheck = await user.isPasswordCorrect(password);

    if (!passwordCheck)
      return NextResponse.json({
        status: 404,
        message: "Password not matched!",
      });

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id,
    );

    const options = {
      secure: true,
    };

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken",
    );

    if (!loggedInUser)
      return NextResponse.json({
        status: 500,
        message: "Something went wrong try after sometime",
      });
    const response = NextResponse.json({
      user: loggedInUser,
      accessToken,
      refreshToken,
    });
    response.cookies.set("accessToken", accessToken, options);
    response.cookies.set("refreshToken", refreshToken, options);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Server Error" },
      { status: 500 },
    );
  }
};
