import { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import MessagesFeedContainer from './MessagesFeedContainer'
import MessageInput from './MessageInput'
import { Box, Divider, List, ListItem, ListItemText, Grid } from '@mui/material'
import ChatMembersHeader from './ChatMembersHeader'
import useMessagesActions from '../../hooks/useMessagesActions'
import useChatRedux from '../../hooks/useChatRedux'
import LoadingSpinner from "../../components/LoadingSpinner"
import MessageItem from './MessageItem'


const MessagesFeed = () => {

  return (
      <Routes>
        <Route path="/:id" element={<MessagesList/>}/>
        <Route path="/new/:id" element={<>new</>}/>
      </Routes>
  )
}

const MessagesList = () => {
  const params = useParams()["id"];
  const { chatRooms } = useChatRedux();
  const { getMessagesById, isLoading, error } = useMessagesActions(); 
  const [ messages, setMessages ] = useState([])

  const chatRoom = chatRooms.find(item => parseInt(item.ChatRoom.id) === parseInt(params))
  let chatMembers = []
  if(chatRoom) chatMembers = chatRoom.ChatRoom.ChatMembers


  useEffect(() => {
    if(params) {
      getMessagesById(params).then(data => setMessages(data.ChatMessages))
    }
    return () => setMessages([])
  }, [params])

  // console.log(chatMembers)
  return (
    <MessagesFeedContainer>
      {params && <>
        <ChatMembersHeader chatMembers={chatMembers}/>
        {isLoading && <LoadingSpinner style={{minHeight: "0em", backgroundColor: "initial", transform: "scale(.5)", opacity: .75}}/>}
        <Box sx={{flex: 1}}>
          <Grid 
          container 
          sx={{overflow: "scroll !important", height: "inherit"}}
          // sx={{display: "flex", flexDirection: "column", justifyContent: "end", overflowY: "scroll", height: "300px"}}
          >
            {chatMembers.length > 0 && messages.map(item => <MessageItem 
              key={item.id} 
              message={item.message} 
              chatUser={chatMembers.find(_item => _item.User.id === item.UserId) && chatMembers.find(_item => _item.User.id === item.UserId).User}/>)}
            {chatMembers.length > 0 && messages.map(item => <MessageItem 
              key={item.id} 
              message={item.message} 
              chatUser={chatMembers.find(_item => _item.User.id === item.UserId) && chatMembers.find(_item => _item.User.id === item.UserId).User}/>)}
            {chatMembers.length > 0 && messages.map(item => <MessageItem 
              key={item.id} 
              message={item.message} 
              chatUser={chatMembers.find(_item => _item.User.id === item.UserId) && chatMembers.find(_item => _item.User.id === item.UserId).User}/>)}
            {chatMembers.length > 0 && messages.map(item => <MessageItem 
              key={item.id} 
              message={item.message} 
              chatUser={chatMembers.find(_item => _item.User.id === item.UserId) && chatMembers.find(_item => _item.User.id === item.UserId).User}/>)}
            {chatMembers.length > 0 && messages.map(item => <MessageItem 
              key={item.id} 
              message={item.message} 
              chatUser={chatMembers.find(_item => _item.User.id === item.UserId) && chatMembers.find(_item => _item.User.id === item.UserId).User}/>)}

          </Grid>
        </Box>
        <Divider/>
        <MessageInput/>
      </>}
    </MessagesFeedContainer>
  )
}
export default MessagesFeed