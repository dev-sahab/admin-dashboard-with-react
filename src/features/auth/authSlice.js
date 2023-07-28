import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authApiSlice.js";

// create slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    error: null,
    message: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      (state.message = null), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.user
      });
  },
});

// export setMessageEmpty
export const { setMessageEmpty } = authSlice.actions;

// export
export default authSlice.reducer;
