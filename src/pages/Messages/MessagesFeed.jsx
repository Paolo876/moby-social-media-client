import { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import MessagesFeedContainer from './MessagesFeedContainer'
import MessageInput from './MessageInput'
import { Box, Divider } from '@mui/material'
import axios from 'axios'
import ChatMembersHeader from './ChatMembersHeader'

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
  const [ messages, setMessages ] = useState(null)
  useEffect(() => {
    if(params) {
      axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/chat/${params}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
        .then(res => setMessages(res.data))
    
    }
    return () => setMessages(null)
  }, [params])


  return (
    <MessagesFeedContainer>
      {messages &&
        <>
          <ChatMembersHeader chatMembers={messages.ChatMembers}/>
          <Box flex={1}>hello</Box>
          <Divider/>
          <MessageInput/>
        </>
      }
    </MessagesFeedContainer>
  )
}
export default MessagesFeed