import { createSlice } from "@reduxjs/toolkit";
import { friendsInitialState } from "../initialState";
import { getFriends, sendRequest } from "./friendReducers"

const friendSlice = createSlice({
    name: "friends",
    initialState: friendsInitialState,
    reducers: {
    }, 
    extraReducers: (builder) => {
        builder
        // getFriends
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
        // sendRequest
        .addCase(sendRequest.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(sendRequest.fulfilled, ( state, { payload }) => {
            const { isRequested } = payload;
            const updatedSentRequests = state.sentRequests
            if(isRequested) {
                //add to sentRequests
                state.sentRequests = [payload.User, ...updatedSentRequests]
            } else {
                //remove from sentRequests
                state.sentRequests = updatedSentRequests.filter(item => item.id !== parseInt(payload.FriendId))
            }
            state.error = null;
            state.isLoading = false;
        })
        .addCase(sendRequest.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
    }
});

export const friendActions = friendSlice.actions;
export default friendSlice;