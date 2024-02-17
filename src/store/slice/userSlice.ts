import { createSlice } from "@reduxjs/toolkit"

type User = {
  [key: string]: any;
}

export type UserSliceState = {
  user: User
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