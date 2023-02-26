/**
 * authInitialState
 */
export const authInitialState = {
    user: null,
    isAuthReady: false,
    isLoading: true,    //set to true to prevent render before auth data is fetched.
    error: null,
};


/**
 * postsInitialState
 */
export const postsInitialState = {
    posts: [],
    bookmarks: [],
    isLoading: false,
    error: null,
};


/**
 * chatInitialState
 */
export const chatInitialState = {
    chatRooms: null,
    newChatUser: null,
    isLoading: false,
    error: null,
    isMessagesLoading: false,
    messagesError: null,
    currentChatRoomId: null,
};


/**
 * friendsInitialState
 */
export const friendsInitialState = {
    friends: null,
    onlineFriends: [],
    offlineFriends: [],
    friendRequests: null,
    sentRequests: null,
    isLoading: false,
    error: null,
};

