import { createSlice } from "@reduxjs/toolkit";
import { friendsInitialState } from "../initialState";
import { getFriends } from "./friendReducers"

const friendSlice = createSlice({
    name: "friends",
    initialState: friendsInitialState,
    reducers: {
    }, 
    extraReducers: (builder) => {
        builder
        // getChatRooms
        .addCase(getFriends.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getFriends.fulfilled, ( state, { payload }) => {
            const { Friends, Requesters, Requestees } = payload;
            state.friends = Friends;
            state.friendRequests = Requesters;
            state.sentRequests = Requestees;
            state.error = null;
            state.isLoading = false;
        })
        .addCase(getFriends.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
    }
});

export const friendActions = friendSlice.actions;
export default friendSlice;