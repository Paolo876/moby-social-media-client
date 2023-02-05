import { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import MessagesFeedContainer from './MessagesFeedContainer'
import MessageInput from './MessageInput'
import { Alert, Box, Divider, Grid, List, ListItem, ListItemText, Paper } from '@mui/material'
import ChatMembersHeader from './ChatMembersHeader'
import useMessagesActions from '../../hooks/useMessagesActions'
import useChatRedux from '../../hooks/useChatRedux'
import LoadingSpinner from "../../components/LoadingSpinner"
import MessageItem from './MessageItem'
import NewMessageFeed from './NewMessageFeed'


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
  const { chatRooms } = useChatRedux();
  const { getMessagesById, isLoading, error, setError } = useMessagesActions(); 
  const [ messages, setMessages ] = useState([])
  const chatRoom = chatRooms.find(item => parseInt(item.ChatRoom.id) === parseInt(params))
  let chatMembers = []
  if(chatRoom) chatMembers = chatRoom.ChatRoom.ChatMembers


  useEffect(() => {
    if(params) {
      getMessagesById(params)
      .then(data => setMessages(data.ChatMessages))
    }
    return () => {
      setMessages([])
      setError(null)
    }
  }, [params])

  return (
    <Paper sx={{width: "100%", display: "flex", flexDirection: "column", overflow: "hidden", height: "100%"}}>
      {params && <>
            <Box sx={{width: "100%"}}><ChatMembersHeader chatMembers={chatMembers}/></Box>
            {isLoading && <LoadingSpinner style={{minHeight: "0em", backgroundColor: "initial", transform: "scale(.5)", opacity: .75}}/>}
            {error && <Alert severity='error'>{error}</Alert>}
            <List sx={{width: "100%", overflowY: "auto", display: "flex", flexDirection: "column-reverse", flex: 1, justifyContent: "end"}}>
                {chatMembers.length > 0 && messages.map(item => <MessageItem 
                  key={item.id} 
                  message={item.message} 
                  createdAt={item.createdAt}
                  chatUser={chatMembers.find(_item => _item.User.id === item.UserId) && chatMembers.find(_item => _item.User.id === item.UserId).User}
                />)}
            </List>
            <Divider/>
          <Box sx={{width: "100%"}}><MessageInput/></Box>
      </>}
    </Paper>
  )
}
export default MessagesFeed