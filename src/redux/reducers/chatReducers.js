import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


 /*  @desc       Get all user's chatrooms 
  *  @access     Private
  *  @return     <Array>
  */
export const getChatRooms = createAsyncThunk( 'chat/getChatRooms', async ( payload, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/chat`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        return res.data;
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})


//socketio events

 /*  @desc       realtime listen to messages received 
  *  @access     Private
  *  @return     <Object>
  */
export const receiveMessage = createAsyncThunk( 'chat/receiveMessage', async ( payload, { getState, rejectWithValue }) => {
    const UserId = getState().auth.user.id
    try {
        // { ChatRoom: { id: 1, isLastMessageRead: [{isLastMessageRead: true}], ChatMessages: {[id,]}}}
        // {sender: {…}, ChatRoomId: '9', messageData: {…}, UserId: 1}
        let result = { id: parseInt(payload.ChatRoomId),isLastMessageRead: [{isLastMessageRead: false}], ChatMessages: [{...payload.messageData}]}
        if(UserId === payload.sender.UserId) result.isLastMessageRead[0].isLastMessageRead = true;

        return result
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

// receiveMessage(state, { payload }){
//             const { sender, ChatRoomId, message } = payload;
//             const updatedChatRooms = state.chatRooms;
//             const chatRoom = updatedChatRooms.find(item => item.ChatRoom.id === payload)
//             if(chatRoom){

//             }
//             console.log(payload)
//         },