import { collectionData, connectDB } from "@/db";
import { verifyPassword } from "@/utils/hash";
import { NextRequest, NextResponse } from "next/server";

const connection = connectDB()

const createResponse = (success: boolean, message: string, data?: object): NextResponse => {
  const status = success ? 200 : 500
  return NextResponse.json({success, message, data}, {status})
};

export async function POST(request: NextRequest){
  // fetch params form request
  const { email, password } = await request.json()

  // connection to collection
  const collection = (await connection).collection("user")
  const user = await collection.findOne({email})

  // Find if email exist in db or not
  // If exist, check if password is matching
  if(user){
    if(await verifyPassword(password, user.password)){
      await collection.updateOne({email}, {$set: {"loggedIn": new Date()}})
      return createResponse(true, "logged in", (({ password, ...user }) => user)(user))
    }
    return createResponse(false, "Incorrect Password", {})
  }
  return createResponse(false, "Email Id does not exist", {})
}