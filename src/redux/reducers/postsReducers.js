import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


/** getPosts
 *  @desc Get posts --paginated to 15 posts per request
 */
export const getPosts = createAsyncThunk( 'posts/getPosts', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/posts`, {
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