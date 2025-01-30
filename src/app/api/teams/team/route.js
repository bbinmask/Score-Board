import dbConnect from "@/lib/dbConnect";
import Team from "../../../../models/teams.models.js";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const _id = searchParams.get("_id");

  try {
    const teams = await Team.findById(_id).populate("owner");
    return NextResponse.json({ status: 200, teams });
  } catch (error) {
    return NextResponse.json({ status: 404, message: "Not Found" });
  }
};
