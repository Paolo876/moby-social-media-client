import { createSlice } from "@reduxjs/toolkit";
import { notificationInitialState } from "../initialState";
import { getNotifications } from "./notificationReducer";

const notificationSlice = createSlice({
    name: "notification",
    initialState: notificationInitialState,
    reducers: {
        reset: () => notificationInitialState,
        triggerSnackbar: (state, { payload }) => {
            state.snackbarData = payload;
        },
        clearSnackbar: (state) => {
            state.snackbarData = null;
        },
        addNotification: (state, { payload }) => {
            const updatedNotifications = state.notifications;
            const isExisting = updatedNotifications.some(item => item.id === payload.id)
            if(!isExisting) state.notifications = [payload, ...updatedNotifications];
        }
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(getNotifications.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getNotifications.fulfilled, ( state, { payload }) => {
            state.notifications = payload;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(getNotifications.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
    }
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
