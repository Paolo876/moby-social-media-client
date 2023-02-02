import { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import MessagesFeedContainer from './MessagesFeedContainer'
import MessageInput from './MessageInput'
import { Box, Divider } from '@mui/material'


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
    if(params) setMessages(params)
  }, [params])
  return (
    <MessagesFeedContainer>
      <Box flex={1}>{messages}</Box>
      <Divider/>
      <MessageInput/>
    </MessagesFeedContainer>
  )
}
export default MessagesFeed