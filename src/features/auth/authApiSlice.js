import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/auth/register",
        data
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
