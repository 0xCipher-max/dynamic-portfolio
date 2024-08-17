import connectToDB from "@/database";
import Home from "@/models/Home";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const extractData = await Home.find({});

    if (extractData) {
      return NextResponse.json({
        success: true,
        data: extractData,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 404,
        body: "No data found",
      });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      status: 500,
      body: "An error occurred while fetching data",
    });
  }
}
