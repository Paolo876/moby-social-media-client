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
        return rejectWithValue((err.response && err.response.data) ? err.response.data.message : err.message)
    }
})


 /*  @desc       send/cancel friend request
  *  @access     Private
  *  @return     <Object>  {isRequested: <boolean>, }
  */
 export const sendRequest = createAsyncThunk( 'friends/sendRequest', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/friends/send-request/${payload}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        return res.data;
    } catch (err){
        return rejectWithValue((err.response && err.response.data) ? err.response.data.message : err.message)
    }
})


 /*  @desc       confirm/decline friend request
  *  @access     Private
  *  @return     <Object>
  */
 export const confirmRequest = createAsyncThunk( 'friends/confirmRequest', async ( {data, id}, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/api/friends/confirm-request/${id}`, data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        return res.data;
    } catch (err){
        return rejectWithValue((err.response && err.response.data) ? err.response.data.message : err.message)
    }
})


 /*  @desc       unfriend user
  *  @access     Private
  *  @return     <Object>
  */
 export const unfriend = createAsyncThunk( 'friends/unfriend', async ( id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/friends/unfriend/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        return res.data;
    } catch (err){
        return rejectWithValue((err.response && err.response.data) ? err.response.data.message : err.message)
    }
})