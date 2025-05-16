import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    addInfo: (state, action) => action.payload,
    removeInfo: (state, action) => action.payload,
  },
})

export const { addInfo, removeInfo } = userInfoSlice.actions

export default userInfoSlice.reducer
