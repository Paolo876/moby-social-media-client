import { createSlice } from "@reduxjs/toolkit";
import { authorizeToken, login, logout, signup, profileSetup } from "./authReducers";
import { authInitialState } from "../initialState";

const authSlice = createSlice({
    name: "auth",
    initialState: authInitialState,
    reducers: {
        updateUserData(state, { payload }){
            state.user.UserData = payload;
        },
    }, 
    extraReducers: (builder) => {
        builder
        // login
        .addCase(login.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, ( state, { payload }) => {
            state.isLoading = false;
            state.user = payload;
            state.error = null;

        })
        .addCase(login.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
        // signup
        .addCase(signup.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(signup.fulfilled, ( state, { payload }) => {
            state.isLoading = false;
            state.user = payload;
            state.error = null;
        })
        .addCase(signup.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
        // profileSetup
        .addCase(profileSetup.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(profileSetup.fulfilled, ( state, { payload }) => {
            const user = state.user;
            state.isLoading = false;
            state.user = {...user, UserData: payload };
            state.error = null;
        })
        .addCase(profileSetup.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
        // logout
        .addCase(logout.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(logout.fulfilled, ( state ) => {
            state.isLoading = false;
            state.error = null;
            state.user = null;
            state.userData = null;
        })
        .addCase(logout.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
        // authorizeToken
        .addCase(authorizeToken.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(authorizeToken.fulfilled, ( state, { payload } ) => {
            state.isLoading = false;
            state.error = null;
            state.user = payload;
            state.isAuthReady = true;
        })
        .addCase(authorizeToken.rejected, ( state ) => {
            state.isLoading = false;
            state.isAuthReady = true;
        })
    }
});

export const authActions = authSlice.actions;
export default authSlice;