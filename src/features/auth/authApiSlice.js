import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// register 
export const registerUser = createAsyncThunk("auth/registerUser", async (data) => {
    const response = await axios.post("http://localhost:5050/api/v1/auth/register", data)
})