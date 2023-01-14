import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


/** authorizeToken
 *  @desc Runs on page init, authorizes the http-cookie token saved on browser if exists.
 */
export const authorizeToken = createAsyncThunk( 'auth/authorizeToken', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/auth/authorize`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        return res.data;
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})


/** login
 *  @desc   login a user
 *  @params payload { userame, password }
 */
export const login = createAsyncThunk( 'auth/login', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/api/auth/login`, payload , {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        return res.data;
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})


/** signup
 *  @desc   signup a user
 *  @params payload { userame, password }
 */
export const signup = createAsyncThunk( 'auth/signup', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/api/auth/signup`, payload , {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        return res.data;
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})


/** profileSetup
 *  @desc   setup new user's profile
 *  @params payload { firstName, lastName, birthday, image }
 */
export const profileSetup = createAsyncThunk( 'auth/profileSetup', async ( payload, { rejectWithValue }) => {
    try {
        // fetch(`${process.env.REACT_APP_DOMAIN_URL}/api/auth/profile-setup`, { method: "POST",credentials: 'include',headers: {
        //     'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        //   }, body: JSON.stringify(payload)})
        //     .then((response) => response.json())
        //     .then((data) => console.log(data));
        const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/api/auth/profile-setup`, payload , {
            headers: {'Content-Type':'application/json'},
            withCredentials: true,
        });
        console.log(res.data)
        return res.data;
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})


/** logout
 *  @desc logout a user, clears http cookie, resets auth state to inital values
 */
export const logout = createAsyncThunk( 'auth/logout', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/auth/logout` , {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        return res.data;
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})