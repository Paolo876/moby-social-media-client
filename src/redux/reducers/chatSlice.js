import { createSlice } from "@reduxjs/toolkit";
import { getChatRooms } from "./chatReducers";
import { chatInitialState } from "../initialState";

const chatSlice = createSlice({
    name: "chat",
    initialState: chatInitialState,
    reducers: {
        setNewChatUser(state, { payload }){
            state.newChatUser = payload
        },
        clearNewChatUser(state){
            state.newChatUser = null;
        },
        addNewChatRoom(state, { payload }) {
            state.chatRooms = [ payload, ...state.chatRooms]
        },
        updateOnMessageSent(state, { payload }){
            const { id, ChatMessages } = payload;
            const updatedChatRooms = state.chatRooms;
            const chatRoom = updatedChatRooms.find(item => item.ChatRoom.id === id)
            chatRoom.ChatRoom.ChatMessages = ChatMessages;
            updatedChatRooms.unshift(updatedChatRooms.splice(updatedChatRooms.indexOf(chatRoom), 1)[0]) //move to first 
            state.chatRooms = updatedChatRooms;
        },
        setLastMessageAsRead(state, { payload }) {
            const updatedChatRooms = state.chatRooms;
            const chatRoom = updatedChatRooms.find(item => item.ChatRoom.id === payload)
            chatRoom.ChatRoom.isLastMessageRead = [{isLastMessageRead: true }]
            state.chatRooms = updatedChatRooms;
        },

        //socketio
        receiveMessage(state, { payload }){
            console.log(payload)
        },
    }, 
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