"use server"

import { cookies } from "next/headers"

export const getCookie = (key: string) => {
  const cookie = cookies()
  return cookie.get(key)
}

export const checkAuthCookie = async() => {
  return await getCookie("authToken") ? true : false
}