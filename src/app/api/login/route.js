import connectToDB from "@/database";
import User from "@/models/User";
import { compare, hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const { username, password } = await req.json();

    const checkUser = await User.findOne({ username });

    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: "Please enter correct username or password",
      });
    }

    const hasPassword = await hash(checkUser.password, 12);
    const checkPassword = await compare(password, hasPassword);

    if (!checkPassword) {
      return NextResponse.json({
        sucess: false,
        message: "Please enter the correect username or password",
      });
    }
    return NextResponse.json({
      success: true,
      message: "Login Successfull",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something got wrong! Please try again",
    });
  }
}
