import { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import MessagesFeedContainer from './MessagesFeedContainer'
import MessageInput from './MessageInput'
import { Box, Divider, Grid, List, ListItem, ListItemText, Paper } from '@mui/material'
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
          <Paper elevation={1} sx={{ width: "100%"}}>
            <Grid item xs={12}><ChatMembersHeader chatMembers={chatMembers}/></Grid>

            {isLoading && <LoadingSpinner style={{minHeight: "0em", backgroundColor: "initial", transform: "scale(.5)", opacity: .75}}/>}
            <List sx={{width: "100%", minHeight: 0, height: "77vh",overflowY: "auto"}}>
                {chatMembers.length > 0 && messages.map(item => <MessageItem 
                  key={item.id} 
                  message={item.message} 
                  chatUser={chatMembers.find(_item => _item.User.id === item.UserId) && chatMembers.find(_item => _item.User.id === item.UserId).User}
                />)}
            </List>
            <Divider/>
        </Paper>
        <Paper elevation={3} sx={{ width: "100%", mt: 1.5}}>
          <Grid item xs={12}><MessageInput/></Grid>
        </Paper>
      </>}
    </MessagesFeedContainer>
  )
}
export default MessagesFeed