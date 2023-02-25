import { useEffect, useState, useRef } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import useMessagesActions from '../../hooks/useMessagesActions'
import useChatRedux from '../../hooks/useChatRedux'
import MessageInput from './MessageInput'
import ChatMembersHeader from './ChatMembersHeader'
import MessageItem from './MessageItem'
import NewMessageFeed from './NewMessageFeed'
import LoadingSpinner from "../../components/LoadingSpinner"
import { Alert, Box, Divider, List, Paper } from '@mui/material'
import useSocketIo from '../../hooks/useSocketIo'

const MessagesFeed = () => {
  return (
      <Routes>
        <Route path="/:id" element={<MessagesList/>}/>
        <Route path="/new/:id" element={<><NewMessageFeed/></>}/>
      </Routes>
  )
}

const MessagesList = () => {
  const params = useParams()["id"];
  const { chatRooms, updateOnMessageSent, isMessagesLoading, messagesError, getMessagesById } = useChatRedux();
  const { isLoading, error, setError, sendMessage } = useMessagesActions(); 
  const chatRoom = chatRooms.find(item => parseInt(item.ChatRoom.id) === parseInt(params))

  let chatMembers = []
  if(chatRoom) chatMembers = chatRoom.ChatRoom.ChatMembers

  useEffect(() => {
    if(params) {
      getMessagesById(params)
    }
    return () => {
      setError(null)
    }
  }, [params])

  useEffect(() => {
    // console.log(handleReceiveMessage)
  }, [])

  // console.log(chatRoom)
  const handleSubmit = async (input) => {
    const message = await sendMessage({ message: input, ChatRoomId: params}, chatMembers.map(item => item.UserId || item.id)); //send message [post request]
    // setMessages(prevState => [message, ...prevState]) //update messages list
    updateOnMessageSent({id: parseInt(params), ChatMessages: [message]}) //update chat redux
  }

  return (
    <Paper sx={{width: "100%", display: "flex", flexDirection: "column", overflow: "hidden", height: "100%"}}>
      {params && <>
            <Box sx={{width: "100%"}}><ChatMembersHeader chatMembers={chatMembers}/></Box>
            {(isLoading  || isMessagesLoading) && <LoadingSpinner style={{minHeight: "0em", backgroundColor: "initial", transform: "scale(.5)", opacity: .75}}/>}
            {(error || messagesError) && <Alert severity='error'>{error || messagesError}</Alert>}
            <List sx={{width: "100%", overflowY: "auto", display: "flex", flexDirection: "column-reverse", flex: 1, justifyContent: "end"}}>
                {chatMembers.length > 0 && chatRoom.ChatRoom.ChatMessages.map(item => <MessageItem 
                  key={item.id} 
                  message={item.message} 
                  createdAt={item.createdAt}
                  chatUser={chatMembers.find(_item => _item.User.id === item.UserId) && chatMembers.find(_item => _item.User.id === item.UserId).User}
                />)}
            </List>
            <Divider/>
          <Box sx={{width: "100%"}}><MessageInput handleSubmit={handleSubmit} disabled={(error && true) || isLoading}/></Box>
      </>}
    </Paper>
  )
}
export default MessagesFeed