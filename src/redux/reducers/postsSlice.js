import { createSlice } from "@reduxjs/toolkit";
import { postsInitialState } from "../initialState";
import { getPosts, createPost, likePost, bookmarkPost, getBookmarkedPosts } from "./postsReducers";

const postsSlice = createSlice({
    name: "posts",
    initialState: postsInitialState,
    reducers: {
        removeFromPosts(state, { payload }){
            const updatedPosts = state.posts;
            state.posts = updatedPosts.filter(item => item.id !== parseInt(payload))
        },
        reset: () => postsInitialState,
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
        //getBookmarkedPosts
        .addCase(getBookmarkedPosts.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getBookmarkedPosts.fulfilled, ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.bookmarks = payload;
        })
        .addCase(getBookmarkedPosts.rejected, ( state, { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
        //bookmarkPost
        .addCase(bookmarkPost.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(bookmarkPost.fulfilled, ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            const { isBookmarked, PostId } = payload;
            const updatedBookmarks = state.bookmarks;
            if(isBookmarked) {
                updatedBookmarks.push({PostId: parseInt(PostId)});
            } else {
                updatedBookmarks.splice(updatedBookmarks.indexOf(updatedBookmarks.find(item => parseInt(item.PostId) === parseInt((PostId)))), 1)
            }
            state.bookmarks = updatedBookmarks;
        })
        .addCase(bookmarkPost.rejected, ( state, { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
    }
});

export const postsActions = postsSlice.actions;
export default postsSlice;
