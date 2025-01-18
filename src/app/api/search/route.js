import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect.js";
import User from "@/models/users.models.js";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    if (!search) return;

    if (search.startsWith("@", 0)) {
      const username = search.slice(1);

      const users = await User.find({
        username: { $regex: username, $options: "i" },
      });

      if (!users) {
        return NextResponse.json({ status: 404, users: "No results found." });
      }

      return NextResponse.json({ status: 200, users });
    }

    const fullName = search;

    const users = await User.find({
      fullName: { $regex: fullName, $options: "i" },
    });

    if (!users) {
      return NextResponse.json({ status: 404, users: "No results found." });
    }

    return NextResponse.json({ status: 200, users });
  } catch (error) {
    return NextResponse.json({ status: 200, message: "Internal Server Error" });
  }
}

export async function POST(req, res) {
  await dbConnect();

  try {
    const body = await req.json();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
