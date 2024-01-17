"use server"

import { connectDB } from "@/db"
import { domain, path } from "@/utils/api"
import { encrypt } from "@/utils/hash"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type User = {
  name: string,
  email: string,
  password: string,
  createDate: Date,
  loggedIn: Date,
  loggedOut: null,
}

type SignUpFormData = {
  name: string,
  email: string,
  password: string,
  rePassword: string
}

const createResponse = ({success, message, data} : {success: boolean, message: string, data?: object}) => {
  const status = success ? 200 : 500
  return { success, message, data, status }
};

export const signup = async(formData: FormData) => {
  const form = Object.fromEntries(formData.entries()) as SignUpFormData
  const {rePassword, ...userDetails} = form

  const { name, email, password } = userDetails

  const connection = connectDB()

  const collection = (await connection).collection("user")
  const user = await collection.findOne({ email })

  // Find if email exist in db or not
  // If not create a new user and insert
  const hashedPassword = await encrypt(password)
  const userInfo: User = {
    name: name,
    email: email,
    password: hashedPassword,
    createDate: new Date(),
    loggedIn: new Date(),
    loggedOut: null
  }

  if(!user){
    const result = await collection.insertOne({ ...userInfo })
    if (result.acknowledged) {
      cookies().set("authToken", "token")
      const {password, ...data} = userInfo
      const serializedUserInfo = {
        ...data,
        createDate: userInfo.createDate.toISOString(),
        loggedIn: userInfo.loggedIn.toISOString(),
      };
      return createResponse({success: true, message: "Created", data: serializedUserInfo})
    }
    return createResponse({success: false, message: "Not Created", data: {message: "Hello"}})
  }
  return createResponse({success: false, message: "Email Id already Exist", data: {status: "True"}})
}