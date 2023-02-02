import { createSlice } from "@reduxjs/toolkit";
import { getChatRooms } from "./chatReducers";
import { chatInitialState } from "../initialState";

const chatSlice = createSlice({
    name: "chat",
    initialState: chatInitialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
        // getChatRooms
        .addCase(getChatRooms.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getChatRooms.fulfilled, ( state, { payload }) => {
            state.isLoading = false;
            state.chatRooms = payload;
            state.error = null;
        })
        .addCase(getChatRooms.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
    }
});

export const chatActions = chatSlice.actions;
export default chatSlice;