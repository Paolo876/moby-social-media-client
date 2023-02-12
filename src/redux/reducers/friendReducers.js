import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


 /*  @desc       Get friends
  *  @access     Private
  *  @return     <Array>
  */
 export const getFriends = createAsyncThunk( 'friends/getFriends', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/friends`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        return res.data;
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})


 /*  @desc       send/cancel friend request
  *  @access     Private
  *  @return     <Object>  {isRequested: <boolean>, }
  */
 export const sendRequest = createAsyncThunk( 'friends/sendRequest', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/send-request/${payload}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        return res.data;
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})