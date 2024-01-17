import { createSlice } from "@reduxjs/toolkit"

type UserSliceState = {
  user: object
}

const initialState: UserSliceState = {
  user: {}
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => { 
      state.user = action.payload
    },
  },
})

export default userSlice.reducer

export const { setUser } = userSlice.actions