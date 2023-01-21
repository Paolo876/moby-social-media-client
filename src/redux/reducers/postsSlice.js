import { createSlice } from "@reduxjs/toolkit";
import { postsInitialState } from "../initialState";
import { getPosts, createPost } from "./postsReducers";

const postsSlice = createSlice({
    name: "posts",
    initialState: postsInitialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
        //getPosts
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
        //createPost
        .addCase(createPost.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(createPost.fulfilled, ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            const updatedPosts = state.posts;
            updatedPosts.unshift(payload)
            state.posts = updatedPosts;
        })
        .addCase(createPost.rejected, ( state, { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
    }
});

export const postsActions = postsSlice.actions;
export default postsSlice;
