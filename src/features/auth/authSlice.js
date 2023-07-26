import { createSlice } from "@reduxjs/toolkit";


// create slice
const authSlice = createSlice({
    name : "auth",
    initialState : {
        user: {}
    },
    reducers: {},
    extraReducers : (builder) => {}
})

// export 
export default authSlice.reducer