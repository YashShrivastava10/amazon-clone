"use server"

import { connectDB } from "@/db"
import { UserType } from "@/types/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";const connection = connectDB()

const secretKey = process.env.JWT_SECRET_KEY

if(!secretKey) throw new Error("JWT Secret Key is not valid")

export const fetchUser = async (email: string) => {
  const collection = (await connection).collection("user")
  return { user: await collection.findOne({ email }), collection }
}

export const createResponse = ({ success, message, data }: { success: boolean, message: string, data?: object }) => {
  const status = success ? 200 : 500
  return { success, message, data, status }
};

export const setCookie = (email: string, status: boolean = false) => {
  const maxAge = status ? 15 * 24 * 60 * 60 : 24 * 60 * 60
  const token = jwt.sign({ email }, secretKey);
  cookies().set("authToken", token, {secure: true, httpOnly: true, maxAge});
}

export const getSerializedUserInfo = (data: object, user: UserType) => {
  const serializedUserInfo = {
    ...data,
    createDate: user.createDate.toISOString(),
    loggedIn: user.loggedIn.toISOString(),
  };
  return serializedUserInfo
}