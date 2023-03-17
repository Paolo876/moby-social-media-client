import { useEffect, useState } from 'react'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import useMessagesActions from '../../hooks/useMessagesActions'
import useAuthRedux from '../../hooks/useAuthRedux'
import useChatRedux from '../../hooks/useChatRedux'
import useImagekit from '../../hooks/useImagekit'
import MessageInput from './MessageInput'
import ChatMembersHeader from './ChatMembersHeader'
import MessageItem from './MessageItem'
import NewMessageFeed from './NewMessageFeed'
import LoadingSpinner from "../../components/LoadingSpinner"
import { Alert, Box, Divider, List, Paper } from '@mui/material'

const MessagesFeed = ({authenticationEndpoint}) => {
  return (
    <Routes>
      <Route path="/:id" element={<MessagesList authenticationEndpoint={authenticationEndpoint}/>}/>
      <Route path="/new/:id" element={<><NewMessageFeed/></>}/>
    </Routes>
  )
}

const MessagesList = ({authenticationEndpoint}) => {
  const params = useParams()["id"];
  const navigate = useNavigate();
  const { user } = useAuthRedux();
  const { chatRooms, updateOnMessageSent, isMessagesLoading, messagesError, getMessagesById, setLastMessageAsRead, leaveChatRoom } = useChatRedux();
  const { isLoading, error, setError, sendMessage } = useMessagesActions(); 
  const chatRoom = chatRooms.find(item => parseInt(item.ChatRoom.id) === parseInt(params))
  const [ image, setImage ] = useState(null);
  const { uploadImage, isLoading: isImagekitLoading, error: imagekitError } = useImagekit();

  let chatMembers = []
  if(chatRoom) chatMembers = chatRoom.ChatRoom.ChatMembers;

  useEffect(() => {
    if(params) {
      if(chatRoom) {
        if(chatRoom.ChatRoom.ChatMessages.length <= 1) getMessagesById(params)
      } else {
        navigate("/messages")
      }
      setLastMessageAsRead(params)
    }
    return () => {
      leaveChatRoom()
      setError(null)
    }
  }, [params])

  const handleSubmit = async (input) => {
    let result
    //upload to imagekit
    if(image){
      const res = await uploadImage({
        file: image,
        authenticationEndpoint,
        fileName: `post_${user.id}`,
        folder: "/moby/chat/"
      })
      if(!imagekitError){
          const { fileId, name, url, thumbnailUrl } = res;
          const media = JSON.stringify({fileId, name, url, thumbnailUrl})
          result = await sendMessage({ message: input, ChatRoomId: params, media}, chatMembers.map(item => item.UserId || item.id)); //send message [post request]
        }
    } else {
      result = await sendMessage({ message: input, ChatRoomId: params}, chatMembers.map(item => item.UserId || item.id)); //send message [post request]
    }

    updateOnMessageSent({id: parseInt(params), ChatMessages: [result]}) //update chat redux
    setImage(null);
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
                  media={item.media}
                  createdAt={item.createdAt}
                  chatUser={chatMembers.find(_item => _item.User.id === item.UserId) && chatMembers.find(_item => _item.User.id === item.UserId).User}
                />)}
            </List>
            <Divider/>
          <Box sx={{width: "100%"}}>
            <MessageInput 
              handleSubmit={handleSubmit}
              image={image}
              setImage={setImage}
              disabled={(error && true) || isLoading || isImagekitLoading}
            />
          </Box>
      </>}
    </Paper>
  )
}
export default MessagesFeed