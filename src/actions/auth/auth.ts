"use server"

import { encrypt, verifyPassword } from "@/utils/hash";
import { UserType } from "@/types/User";
import { SignUpFormDataType } from "@/types/Form";
import { createResponse, fetchUser, getSerializedUserInfo, setCookie } from "./common";

export const signup = async (formData: FormData) => {
  try {
    const form = Object.fromEntries(formData.entries()) as SignUpFormDataType;
    const { rePassword, ...userDetails } = form;

    const { name, email, password } = userDetails;

    // Fetch User from db
    const { user, collection } = await fetchUser(email);

    // Hash the password
    const hashedPassword: string = await encrypt(password);

    const userInfo: UserType = {
      name: name,
      email: email,
      password: hashedPassword,
      createDate: new Date(),
      loggedIn: new Date(),
      loggedOut: null
    };

    // If user exists, do not create a new user in db
    if (user) {
      return createResponse({ success: false, message: "Email Id already Exist", data: { status: "True" } });
    }

    // If the user does not exist, create a new user in db
    const result = await collection.insertOne({ ...userInfo });

    if (result.acknowledged) {
      
      setCookie(email, true)

      const { password, ...data } = userInfo;
      const serializedUserInfo = getSerializedUserInfo(data, userInfo)
  
      return createResponse({ success: true, message: "Created", data: serializedUserInfo });
    } else {
      return createResponse({ success: false, message: "Not Created", data: { message: "Hello" } });
    }
  } catch (error) {
    // Handle other errors if needed
    console.error("Error in signup:", error);
    return createResponse({ success: false, message: "Internal Server Error", data: {} });
  }
};

export const signin = async (password: string, email: string, status: boolean) => {

  try{
    // Fetch user
    const { user, collection } = await fetchUser(email)
  
    // If user do not exist
    if (!user)
      return createResponse({ success: false, message: "We cannot find an account with that email address", data: {} })
  
    // If user exist but password do no match
    else if (!await verifyPassword(password, user.password))
      return createResponse({ success: false, message: "Your password is incorrect", data: {} })
  
    // else generate a token, set that in cookie and return true along with data 
    else {
      const typedUser = user as UserType
      const result = await collection.updateOne({ email }, { $set: { loggedIn: new Date() } })
      if (!result.acknowledged)
        return createResponse({ success: false, message: "Not Signed in", data: {} })
  
        setCookie(email, status)
  
      const {_id, password, ...data } = typedUser
      const serializedUserInfo = getSerializedUserInfo(data, typedUser)

      return createResponse({ success: true, message: "Signed in", data: serializedUserInfo })
    }
  }
  catch (error) {
    // Handle other errors if needed
    console.error("Error in signin:", error);
    return createResponse({ success: false, message: "Internal Server Error", data: {} });
  }
}

export const changePassword = async(email: string, password: string) => {
  const {user, collection} = await fetchUser(email)

  if(!user) return createResponse({ success: false, message: "Failed", data: {} })

  const typeUser = user as UserType

  const hashPassword: string = await encrypt(password)
  const response = await collection.updateOne({ email }, {$set: {password: hashPassword}})
  if(response.acknowledged){
    setCookie(email, true)
    const {_id, password, ...data } = typeUser
    const serializedUserInfo = getSerializedUserInfo(data, typeUser)
    return createResponse({ success: true, message: "Signed in", data: serializedUserInfo })
  }
  return createResponse({ success: false, message: "Failed", data: {} })
}

export const checkUser = async (email: string) => {
  const { user, collection } = await fetchUser(email)
  if(user) return true
  return false
}
