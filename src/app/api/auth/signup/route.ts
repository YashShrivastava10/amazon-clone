import { collectionData, connectDB } from "@/db";
import { encrypt } from "@/utils/hash";
import { NextRequest, NextResponse } from "next/server";

const connection = connectDB()

type User = {
  name: string,
  email: string,
  password: string,
  createDate: Date,
  loggedIn: Date,
  loggedOut: null,
}

const createResponse = (success: boolean, message: string, data?: object): NextResponse => {
  const status = success ? 200 : 500
  return NextResponse.json({success, message, data}, {status})
};

export async function POST(request: NextRequest){
  // fetch params form request
  const { name, email, password } = await request.json()

  // connection to collection
  const collection = (await connection).collection("user")
  const user = await collection.findOne({email})

  // Find if email exist in db or not
  // If not create a new user and insert
  const hashedPassword = await encrypt(password)
  const userInfo: User = {
    name,
    email,
    password: hashedPassword,
    createDate: new Date(),
    loggedIn: new Date(),
    loggedOut: null
  }

  if(!user){
    const result = await collection.insertOne({...userInfo})
    if(result.acknowledged)
      return createResponse(true, "Created", (({ password, ...userInfo }) => userInfo)(userInfo))
    return createResponse(false, "Not Created", {})
  }
  return createResponse(false, "Email Id already Exist", {})
}