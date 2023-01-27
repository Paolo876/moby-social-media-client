import { createSlice } from "@reduxjs/toolkit";
import { postsInitialState } from "../initialState";
import { getPosts, createPost, likePost } from "./postsReducers";

const postsSlice = createSlice({
    name: "posts",
    initialState: postsInitialState,
    reducers: {
        // addComment(state, { payload }){
        //     state.isLoading = false;
        //     state.userData = payload;
        //     state.error = null;
        //     state.success = false;
        // },
        // setIsLoading(state, { payload }){
        //     state.isLoading = payload;
        //     state.error = null;
        //     state.success = false;
        // },
        // setError(state, { payload }){
        //     state.isLoading = false;
        //     state.error = payload.message;
        //     state.success = false;
        // }
    }, 
    extraReducers: (builder) => {
        builder
        //getPosts
        .addCase(getPosts.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getPosts.fulfilled, ( state, { payload }) => {
            state.isLoading = false;
            state.posts = payload.posts;
            state.bookmarks = payload.bookmarks;
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
        //likePost
        .addCase(likePost.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(likePost.fulfilled, ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            const { isLiked, id, UserId } = payload;
            const updatedPosts = state.posts;
            let post = updatedPosts.find(item => parseInt(item.id) === parseInt(id));
            if(isLiked) {
                post.Likes.push({UserId});
            } else {
                post.Likes = post.Likes.filter(item => item.UserId !== UserId)
            }
            state.posts = updatedPosts;
        })
        .addCase(likePost.rejected, ( state, { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
    }
});

export const postsActions = postsSlice.actions;
export default postsSlice;
