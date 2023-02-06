import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


 /*  @desc       Get all user's chatrooms 
  *  @access     Private
  *  @return     <Array>
  */
export const getChatRooms = createAsyncThunk( 'chat/getChatRooms', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/chat`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        console.log(res.data)
        return res.data;
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})