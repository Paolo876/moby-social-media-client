import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


import { postsInitialState } from "../initialState";
import { getPosts } from "./postsReducers";
const postsSlice = createSlice({
    name: "posts",
    initialState: postsInitialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
        .addCase(getPosts.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getPosts.fulfilled, ( state, { payload }) => {
            state.isLoading = false;
            state.posts = payload;
            state.error = null;
        })
        .addCase(getPosts.rejected, ( state, { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
    }
});

export const postsActions = postsSlice.actions;
export default postsSlice;
