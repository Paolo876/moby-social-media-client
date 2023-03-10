import { createSlice } from "@reduxjs/toolkit";
import { getChatRooms, receiveMessage, getMessagesById, receiveNewMessage } from "./chatReducers";
import { chatInitialState } from "../initialState";

const chatSlice = createSlice({
    name: "chat",
    initialState: chatInitialState,
    reducers: {
        reset: () => chatInitialState,
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
            chatRoom.ChatRoom.ChatMessages = [...ChatMessages, ...chatRoom.ChatRoom.ChatMessages];
            updatedChatRooms.unshift(updatedChatRooms.splice(updatedChatRooms.indexOf(chatRoom), 1)[0]) //move to first 
            state.chatRooms = updatedChatRooms;
        },
        setLastMessageAsRead(state, { payload }) {
            const updatedChatRooms = state.chatRooms;
            const chatRoom = updatedChatRooms.find(item => parseInt(item.ChatRoom.id) === parseInt(payload))
            if(chatRoom){
                chatRoom.ChatRoom.isLastMessageRead = [{isLastMessageRead: true }]
                state.currentChatRoomId = chatRoom.ChatRoom.id
                state.chatRooms = updatedChatRooms;
                
            }
        },
        leaveChatRoom(state) {
            state.currentChatRoomId = null;
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
        // getMessagesById
        .addCase(getMessagesById.pending, ( state ) => {
            state.isMessagesLoading = true;
            state.messagesError = null;
        })
        .addCase(getMessagesById.fulfilled, ( state, { payload }) => {
            const updatedChatRooms = state.chatRooms;
            const chatRoom = updatedChatRooms.find(item => parseInt(item.ChatRoom.id) === parseInt(payload.id))
            chatRoom.ChatRoom.ChatMessages = payload.ChatMessages;
            chatRoom.ChatRoom.isLastMessageRead = [{isLastMessageRead: true }]

            state.currentChatRoomId = chatRoom.ChatRoom.id
            state.chatRooms = updatedChatRooms;
            state.isMessagesLoading = false;
            state.messagesError = null;
        })
        .addCase(getMessagesById.rejected, ( state , { payload }) => {
            state.isMessagesLoading = false;
            state.messagesError = payload.message;
        })
        // receiveMessage
        .addCase(receiveMessage.pending, ( state ) => {
            state.error = null;
        })
        .addCase(receiveMessage.fulfilled, ( state, { payload }) => {
            if(state.chatRooms){
                const updatedChatRooms = state.chatRooms;
                const chatRoom = updatedChatRooms.find(item => parseInt(item.ChatRoom.id) === parseInt(payload.id))
                if(chatRoom.ChatRoom.ChatMessages.length !== 0 && chatRoom.ChatRoom.ChatMessages[0].id !== payload.ChatMessages[0].id){
                    chatRoom.ChatRoom.ChatMessages = [...payload.ChatMessages, ...chatRoom.ChatRoom.ChatMessages];
                    chatRoom.ChatRoom.isLastMessageRead = payload.isLastMessageRead

                    //set isLastMessageRead to true if user is currently in the chatRoom
                    if(state.currentChatRoomId === parseInt(payload.id)) chatRoom.ChatRoom.isLastMessageRead = [{isLastMessageRead: true}]
                    updatedChatRooms.unshift(updatedChatRooms.splice(updatedChatRooms.indexOf(chatRoom), 1)[0]) //move to first 
                    state.chatRooms = updatedChatRooms;    
                }
            }

            state.isMessagesLoading = false;
            state.error = null;
        })
        .addCase(receiveMessage.rejected, ( state , { payload }) => {
            state.isMessagesLoading = false;
            state.error = payload.message;
        })
        // receiveNewMessage
        .addCase(receiveNewMessage.pending, ( state ) => {
            state.error = null;
        })
        .addCase(receiveNewMessage.fulfilled, ( state, { payload }) => {
            if(state.chatRooms){
                const updatedChatRooms = state.chatRooms;
                const chatRoom = updatedChatRooms.find(item => parseInt(item.ChatRoom.id) === parseInt(payload.ChatRoom.id))
                if(!chatRoom){
                    state.chatRooms = [payload, ...updatedChatRooms]
                }
            }

            state.isMessagesLoading = false;
            state.error = null;
        })
        .addCase(receiveNewMessage.rejected, ( state , { payload }) => {
            state.isMessagesLoading = false;
            state.error = payload.message;
        })
    }
});

export const chatActions = chatSlice.actions;
export default chatSlice;