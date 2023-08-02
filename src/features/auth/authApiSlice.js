import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/auth/register",
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// login
export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/auth/login",
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/auth/logout",
      "",
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// loggedIn user
export const loggedInUser = createAsyncThunk("auth/loggedInUser", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/auth/me", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// loggedIn user password reset
export const userPasswordReset = createAsyncThunk(
  "auth/userPasswordReset",
  async (data) => {
    try {
      const response = await axios.patch(
        "http://localhost:5050/api/v1/auth/reset-password",
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// loggedIn user password reset
export const userProfileUpdate = createAsyncThunk(
  "auth/userProfileUpdate",
  async (data) => {
    try {
      const response = await axios.patch(
        "http://localhost:5050/api/v1/auth/profile-update",
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
