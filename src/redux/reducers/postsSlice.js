import { createSlice } from "@reduxjs/toolkit";
import { postsInitialState } from "../initialState";
import { getPosts, likePost, bookmarkPost, getBookmarkedPosts } from "./postsReducers";

const postsSlice = createSlice({
    name: "posts",
    initialState: postsInitialState,
    reducers: {
        addPost(state, { payload}){
            const updatedPosts = state.posts;
            state.posts = [payload, ...updatedPosts]
        },
        removeFromPosts(state, { payload }){
            const updatedPosts = state.posts;
            state.posts = updatedPosts.filter(item => item.id !== parseInt(payload))
        },
        updatePosts(state, { payload }){
            const updatedPosts = state.posts;
            const existingPost = updatedPosts.find(item => parseInt(item.id) === parseInt(payload.PostId))
            if(existingPost){
                if(payload.type === "like"){

                    if(payload.isLiked ){
                        if(!existingPost.Likes.some(item => parseInt(item.UserId) === (payload.UserId)))existingPost.Likes = [{UserId: parseInt(payload.UserId)}, ...existingPost.Likes]
                    } else {
                        existingPost.Likes = existingPost.Likes.filter(item => parseInt(item.UserId) !== parseInt(payload.UserId))
                    }
                }
                state.posts = updatedPosts;
            }
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
            const updatedPosts = state.posts;
            const updatedPostsIds = updatedPosts.map(item => item.id)
            state.isLoading = false;
            state.posts = payload.posts;
            state.posts = [...updatedPosts, ...payload.posts.filter(item => !updatedPostsIds.includes(item.id))];
            state.pageNumber = payload.pageNumber;
            state.hasMore = payload.hasMore;
            state.bookmarks = payload.bookmarks;
            state.error = null;
        })
        .addCase(getPosts.rejected, ( state, { payload }) => {
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
