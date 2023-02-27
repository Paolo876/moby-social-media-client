import { createSlice } from "@reduxjs/toolkit";
import { friendsInitialState } from "../initialState";
import { getFriends, confirmRequest, unfriend } from "./friendReducers"

const friendSlice = createSlice({
    name: "friends",
    initialState: friendsInitialState,
    reducers: {
        reset: () => friendsInitialState,
        setOnlineFriends: (state, { payload }) => {     //payload = array of UserIds
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
        },
        setLoggedInFriend: (state, { payload }) => {    //payload = {UserId, status}
            const { UserId, status } = payload;
            const updatedOnlineFriends = state.onlineFriends
            const updatedOfflineFriends = state.offlineFriends
            const loggedInFriend = state.friends.find(item => item.id === UserId)
            if(status !== "invisible"){
                loggedInFriend.UserStatus.status = status;
                const isFriendAlreadyLoggedIn = updatedOnlineFriends.find(item => item.id === UserId)
                if(!isFriendAlreadyLoggedIn) state.onlineFriends = [loggedInFriend, ...updatedOnlineFriends]
                state.offlineFriends = updatedOfflineFriends.filter(item => item.id !== UserId)     
            }
        },
        setLoggedOutFriend: (state, { payload }) => {    //payload = UserId
            const updatedOnlineFriends = state.onlineFriends
            const updatedOfflineFriends = state.offlineFriends
            const loggedOutFriend = state.friends.find(item => item.id === payload)
            const isFriendAlreadyLoggedOut = updatedOfflineFriends.find(item => item.id === payload)

            if(!isFriendAlreadyLoggedOut) state.offlineFriends = [loggedOutFriend, ...updatedOfflineFriends]
            state.onlineFriends = updatedOnlineFriends.filter(item => item.id !== payload)
        },
        setStatusChangedFriend: (state, { payload }) => {    //payload = {status, UserId}
            const { status, UserId } = payload;
            const updatedOnlineFriends = state.onlineFriends;
            const updatedOfflineFriends = state.offlineFriends
            const friend = state.friends.find(item => item.id === UserId);
            if(friend){
                //update UserStatus
                friend.UserStatus.status = status;
                if(status === "invisible"){
                    //add to offline list (check if it's already in the list)
                    if(!updatedOfflineFriends.some(item => item.id === UserId)) state.offlineFriends = [friend, ...updatedOfflineFriends]
                    
                    //remove from online list
                    state.onlineFriends = updatedOnlineFriends.filter(item => item.id !== UserId)
                } else {
                    //filter out from offline list
                    state.offlineFriends = updatedOfflineFriends.filter(item => item.id !== UserId)
                    //add to onlineList (check if it's already in the list)
                    if(!updatedOnlineFriends.some(item => item.id === UserId)) {
                        state.onlineFriends = [friend, ...updatedOnlineFriends]
                    } else {
                        const onlineFriend = updatedOnlineFriends.find(item => item.id === UserId)
                        onlineFriend.UserStatus.status = status;
                        state.onlineFriends = updatedOnlineFriends;
                    }
                }
            }
        },
        sendRequestRedux: (state, { payload }) => {
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
        },
        setFriendRequests: (state, { payload }) => {
            const { isRequested } = payload;
            const updatedFriendRequests = state.friendRequests;

            if(payload.isFriends){
                const updatedSentRequests = state.sentRequests;
                const updatedFriends = state.friends;    
                state.sentRequests = updatedSentRequests.filter(item => item.id !== parseInt(payload.FriendId)) //remove from sentRequests
                state.friendRequests = updatedFriendRequests.filter(item => item.id !== parseInt(payload.FriendId)) //remove from sentRequests
                state.friends = [payload.User, ...updatedFriends];
            } else {
                if(isRequested) {
                    const isRequestSent = updatedFriendRequests.some(item => parseInt(item.id) === parseInt(payload.FriendId))
                    if(!isRequestSent) state.friendRequests = [payload.User, ...updatedFriendRequests] //check if friendrequest is already sent, add to friendRequests
                } else {  
                    state.friendRequests = updatedFriendRequests.filter(item => item.id !== parseInt(payload.FriendId)) //remove from friendRequests
                }
            }
            state.error = null;
            state.isLoading = false;
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
        // .addCase(sendRequest.pending, ( state ) => {
        //     state.isLoading = true;
        //     state.error = null;
        // })
        // .addCase(sendRequest.fulfilled, ( state, { payload }) => {
        //     const { isRequested } = payload;
        //     const updatedSentRequests = state.sentRequests;
            
        //     if(payload.isFriends){
        //         const updatedFriendRequests = state.friendRequests;
        //         const updatedFriends = state.friends;
    
        //         state.sentRequests = updatedSentRequests.filter(item => item.id !== parseInt(payload.FriendId)) //remove from sentRequests
        //         state.friendRequests = updatedFriendRequests.filter(item => item.id !== parseInt(payload.FriendId)) //remove from sentRequests
        //         state.friends = [payload.User, ...updatedFriends];
        //     } else {
        //         if(isRequested) {
        //             state.sentRequests = [payload.User, ...updatedSentRequests] //add to sentRequests
        //         } else {  
        //             state.sentRequests = updatedSentRequests.filter(item => item.id !== parseInt(payload.FriendId)) //remove from sentRequests
        //         }
        //     }
        //     state.error = null;
        //     state.isLoading = false;
        // })
        // .addCase(sendRequest.rejected, ( state , { payload }) => {
        //     state.isLoading = false;
        //     state.error = payload.message;
        // })
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