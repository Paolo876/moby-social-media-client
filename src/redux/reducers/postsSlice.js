import { createSlice } from "@reduxjs/toolkit";
import { postsInitialState } from "../initialState";

const postsSlice = createSlice({
    name: "posts",
    initialState: postsInitialState,
    reducers: {}, 
    extraReducers: {
        //login
        // [login.pending.type]: ( state ) => {
        //     state.isLoading = true;
        //     state.error = null;
        // },
        // [login.fulfilled.type]: ( state, { payload }) => {
        //     state.isLoading = false;
        //     state.user = payload;
        //     state.error = null;
        // },
        // [login.rejected]: ( state , { payload }) => {
        //     state.isLoading = false;
        //     state.error = payload.message;
        // },
    }
});

export const postsActions = postsSlice.actions;
export default postsSlice;
