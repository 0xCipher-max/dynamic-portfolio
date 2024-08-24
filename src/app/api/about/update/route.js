import connectToDB from "@/database";
import About from "@/models/About";
import { Elsie_Swash_Caps } from "next/font/google";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();

    const extractData = await req.json();
    const {
      _id,
      aboutme,
      noofprojects,
      yearofexperience,
      noofclients,
      skills,
    } = extractData;

    const updateData = await About.findOneAndUpdate(
      {
        _id: _id,
      },
      { aboutme, noofprojects, yearofexperience, noofclients, skills },
      { new: true }
    );
    if (updateData) {
      return NextResponse.json({
        success: true,
        message: "updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "aomething went wrong",
      });
    }
  } catch (err) {
    console.log(err);

    return NextResponse.json({
      success: false,
      message: "aomething went wrong",
    });
  }
}
