import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


/** getPosts
 *  @desc Get posts --paginated to 15 posts per request
 */
export const getPosts = createAsyncThunk( 'posts/getPosts', async ( pageNumber, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/posts?pageNumber=${pageNumber}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        return res.data;
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})


/** createPost
 *  @desc create a new post
 */
export const createPost = createAsyncThunk( 'posts/createPost', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/api/posts/create`, payload, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        return res.data;
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})


/** likePost
 *  @desc like/unlike a post. If post is already liked, it unlikes automatically from server
 */
export const likePost = createAsyncThunk( 'posts/likePost', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/posts/like/${payload}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        return res.data;
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})


/** bookmarkPost
 *  @desc bookmark a post. If post is already bookmarked, it unlikes automatically from server
 */
export const bookmarkPost = createAsyncThunk( 'posts/bookmarkPost', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/posts/bookmark/${payload}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        return res.data;
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})


/** getBookmarkedPosts
 *  @desc get bookmarked posts by the user
 */
export const getBookmarkedPosts = createAsyncThunk( 'posts/getBookmarkedPosts', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/auth/bookmarks`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        return res.data;
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})