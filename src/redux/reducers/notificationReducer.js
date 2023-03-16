import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


 /*  @desc       Get notifications
  *  @access     Private
  *  @return     <Array>
  */
 export const getNotifications = createAsyncThunk( 'notification/getNotifications', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/notifications`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        return res.data;
    } catch (err){
        return rejectWithValue((err.response && err.response.data) ? err.response.data.message : err.message)
    }
})


 /*  @desc       set isRead property of notification to true
  *  @access     Private
  *  @return     <Object>
  */
 export const markAsRead = createAsyncThunk( 'notification/markAsRead', async ( id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/notifications/read/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        return res.data;
    } catch (err){
        return rejectWithValue((err.response && err.response.data) ? err.response.data.message : err.message)
    }
})


 /*  @desc       Delete all user notifications
  *  @access     Private
  *  @return     <Object>
  */
 export const deleteAllNotifications = createAsyncThunk( 'notification/deleteAllNotifications', async ( id, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_DOMAIN_URL}/api/notifications/clear-all`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        return res.data;
    } catch (err){
        return rejectWithValue((err.response && err.response.data) ? err.response.data.message : err.message)
    }
})


 /*  @desc       Mark all notifications as read
  *  @access     Private
  *  @return     <Object>
  */
 export const readAllNotifications = createAsyncThunk( 'notification/readAllNotifications', async ( id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/notifications/read-all`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        return res.data;
    } catch (err){
        return rejectWithValue((err.response && err.response.data) ? err.response.data.message : err.message)
    }
})


 /*  @desc       Delete a notification by id
  *  @access     Private
  *  @return     <Object>
  */
 export const deleteById = createAsyncThunk( 'notification/deleteById', async ( id, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_DOMAIN_URL}/api/notifications/delete/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        return res.data;
    } catch (err){
        return rejectWithValue((err.response && err.response.data) ? err.response.data.message : err.message)
    }
})