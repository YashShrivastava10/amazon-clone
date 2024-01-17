

export const path = {
  "signin": "/auth/signin",
  "signup": "/auth/signup",
}

export const domain = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEVAPI : process.env.NEXT_PUBLIC_PRODAPI
