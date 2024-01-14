import { connectDB } from "@/db";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export function GET(request: NextRequest){
  console.log(request);
  return NextResponse.json({message: "hello"})
}