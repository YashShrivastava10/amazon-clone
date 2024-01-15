import bcrypt from "bcrypt"

const saltRounds = 10

export const encrypt = async(password: string) => {
  try{
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
  }
  catch(error){
    console.log("Can't encrypt");
    throw error
  }
}

export const verifyPassword = async(typedPassword: string, userPassword: string) => {
  try{
    const isMatch = await bcrypt.compare(typedPassword, userPassword) // First argument should be non-hashed
    if(isMatch) return true
    return false
  }
  catch(error){
    console.log("Can't decrypt");
    throw error
  }
}