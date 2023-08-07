import { createSlice } from "@reduxjs/toolkit";
import {
  createPermission,
  createRole,
  createUser,
  deletePermission,
  deleteRole,
  getAllPermission,
  getAllRole,
  getAllUser,
  updatePermission,
  updatePermissionStatus,
  updateRoleData,
  updateRoleStatus,
} from "./userApiSlice.js";

// create slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    error: null,
    message: null,
    role: null,
    permission: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      (state.message = null), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllPermission.fulfilled, (state, action) => {
        state.permission = action.payload;
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.permission.push(action.payload.permission);
      })
      .addCase(updatePermissionStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePermissionStatus.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.permission[
          state.permission.findIndex(
            (data) => data._id == action.payload.permission._id
          )
        ] = action.payload.permission;
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.permission = state.permission.filter(
          (data) => data._id !== action.payload.permission._id
        );
      })
      .addCase(updatePermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.permission[
          state.permission.findIndex(
            (data) => data._id == action.payload.permission._id
          )
        ] = action.payload.permission;
      })
      .addCase(getAllRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllRole.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role = action.payload;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role.push(action.payload.role);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role = state.role.filter(
          (data) => data._id !== action.payload.role._id
        );
      })
      .addCase(updateRoleStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateRoleStatus.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role[
          state.role.findIndex((data) => data._id == action.payload.role._id)
        ] = action.payload.role;
      })
      .addCase(updateRoleData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateRoleData.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role[
          state.role.findIndex((data) => data._id == action.payload.role._id)
        ] = action.payload.role;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user =  state.user ??  [];
        state.user.push(action.payload.user);
      });
  },
});

// selectors
export const getUserData = (state) => state.user;

// export setMessageEmpty
export const { setMessageEmpty } = userSlice.actions;

// export
export default userSlice.reducer;
