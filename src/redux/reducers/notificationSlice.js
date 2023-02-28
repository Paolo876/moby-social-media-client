import { createSlice } from "@reduxjs/toolkit";
import { notificationInitialState } from "../initialState";


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
        }
    }, 
    // extraReducers: (builder) => {
    //     builder

    // }
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
