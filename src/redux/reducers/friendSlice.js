import { createSlice } from "@reduxjs/toolkit";
import { friendsInitialState } from "../initialState";
import { getFriends, sendRequest, confirmRequest, unfriend } from "./friendReducers"

const friendSlice = createSlice({
    name: "friends",
    initialState: friendsInitialState,
    reducers: {
        setOnlineFriends: (state, { payload }) => {     //payload is an array of UserIds
            let updatedOnlineFriends = []
            let updatedOfflineFriends = []
            state.friends.forEach(item => {
                if(payload.includes(item.id) && item.UserStatus.status !== "invisible") {
                    updatedOnlineFriends.push(item)
                } else {
                    updatedOfflineFriends.push(item)
                }
            })
            state.onlineFriends = updatedOnlineFriends;
            state.offlineFriends = updatedOfflineFriends;
        }
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
            const updatedSentRequests = state.sentRequests;

            if(payload.isFriends){
                const updatedFriendRequests = state.friendRequests;
                const updatedFriends = state.friends;
    
                state.sentRequests = updatedSentRequests.filter(item => item.id !== parseInt(payload.FriendId)) //remove from sentRequests
                state.friendRequests = updatedFriendRequests.filter(item => item.id !== parseInt(payload.FriendId)) //remove from sentRequests
                state.friends = [payload.User, ...updatedFriends];
            } else {
                if(isRequested) {
                    state.sentRequests = [payload.User, ...updatedSentRequests] //add to sentRequests
                } else {  
                    state.sentRequests = updatedSentRequests.filter(item => item.id !== parseInt(payload.FriendId)) //remove from sentRequests
                }
            }
            state.error = null;
            state.isLoading = false;
        })
        .addCase(sendRequest.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
        // confirmRequest
        .addCase(confirmRequest.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(confirmRequest.fulfilled, ( state, { payload }) => {
            const { isConfirmed } = payload;
            const updatedFriendRequests = state.friendRequests;
            const updatedFriends = state.friends;
            
            if(payload.isFriends){
                const updatedSentRequests = state.sentRequests;
                state.sentRequests = updatedSentRequests.filter(item => item.id !== parseInt(payload.FriendId)) //remove from sentRequests
                state.friendRequests = updatedFriendRequests.filter(item => item.id !== parseInt(payload.FriendId)) //remove from sentRequests
                state.friends = [payload.User, ...updatedFriends];
            } else {
                if(isConfirmed) {
                    state.friends = [payload.User, ...updatedFriends] //add to friends
                }
                state.friendRequests = updatedFriendRequests.filter(item => item.id !== parseInt(payload.FriendId)) //remove from friendRequests
            }

            state.error = null;
            state.isLoading = false;
        })
        .addCase(confirmRequest.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
        // unfriend
        .addCase(unfriend.pending, ( state ) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(unfriend.fulfilled, ( state, { payload }) => {
            const { isFriends, FriendId } = payload;
            
            if(!isFriends){
                const updatedFriends = state.friends;
                state.friends = updatedFriends.filter(item => item.id !== parseInt(FriendId))
            }
            state.error = null;
            state.isLoading = false;
        })
        .addCase(unfriend.rejected, ( state , { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        })
    }
});

export const friendActions = friendSlice.actions;
export default friendSlice;