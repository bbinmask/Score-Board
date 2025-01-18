// pages/api/addPlayer.js

import dbConnect from "@/lib/dbConnect";
import Team from "../../../models/teams.models.js";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  await dbConnect();

  try {
    const body = await req.json();
    const { name, players } = body;
    const userId = await req.cookies.get("user-id")?.value;

    if (!name || !players || !userId) {
      return NextResponse.json({ status: 404, message: "Bad request" });
    }
    console.log(name, players);
    const team = await Team.create({
      name: name,
      owner: userId,
      players: players,
    });

    const createdTeam = await Team.findById(team?._id);

    console.log(createdTeam);

    return NextResponse.json({ status: 200, message: "OK" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
};
export const GET = async (req, res) => {
  try {
    const teams = await Team.find({});

    return NextResponse.json({ status: 200, teams });
  } catch (error) {
    return NextResponse.json({ status: 404, message: "Not Found" });
  }
};
