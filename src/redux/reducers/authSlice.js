import { createSlice } from "@reduxjs/toolkit";
import { authorizeToken, login, logout, signup, profileSetup } from "./authReducers";
import { authInitialState } from "../initialState";

const authSlice = createSlice({
    name: "auth",
    initialState: authInitialState,
    reducers: {
        // setUserData(state, { payload }){
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
    extraReducers: {
        //login
        [login.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
        },
        [login.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.user = payload;
            state.error = null;
        },
        [login.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
        //signup
        [signup.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
        },
        [signup.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.user = payload;
            state.error = null;
        },
        [signup.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
        //profileSetup
        [profileSetup.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
        },
        [profileSetup.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.user = payload;
            state.error = null;
        },
        [profileSetup.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
        //logout
        [logout.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
        },
        [logout.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.user = null;
            state.userData = null;
        },
        [logout.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
        //authorizeToken
        [authorizeToken.pending.type]: ( state ) => {
            state.isLoading = true;
            state.error = null;
            state.success = false;
        },
        [authorizeToken.fulfilled.type]: ( state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.user = payload;
            state.isAuthReady = true;
        },
        [authorizeToken.rejected]: ( state , { payload }) => {
            state.isLoading = false;
            state.success = false;
            state.isAuthReady = true;
            // state.error = payload.message
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;
