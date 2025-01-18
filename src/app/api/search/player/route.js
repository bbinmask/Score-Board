import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect.js";
import User from "../../../../models/users.models.js";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const token = await req.cookies.get("accessToken")?.value;
    const userId = await req.cookies.get("user-id")?.value;
    if (!id) {
      return NextResponse.json({
        status: 501,
        message: "Something went wrong",
      });
    }

    if (userId == id)
      NextResponse.json({
        status: 200,
        selfSearch: true,
      });

    const user = await User.findById(id).select("-password -refreshToken");

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "Bad request",
      });
    }

    return NextResponse.json({
      status: 200,
      user,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
}
