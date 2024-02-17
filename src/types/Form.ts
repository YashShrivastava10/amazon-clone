export type FormStatusType = "signin" | "signup" | "forgetPassword"

export type SignUpFormDataType = {
  name: string,
  email: string,
  password: string,
  rePassword: string
}