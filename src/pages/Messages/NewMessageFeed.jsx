import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import useChatRedux from '../../hooks/useChatRedux'
import useAuthRedux from '../../hooks/useAuthRedux';
import MessageInput from './MessageInput';
import MaterialRoot from "../../components/MaterialRoot"
import Image from '../../components/Image';
import defaultAvatar from "../../assets/default-profile.png"
import axios from 'axios';
import { Paper, Divider, Box, Alert, IconButton, Typography, Tooltip } from '@mui/material';
import useSocketIo from '../../hooks/useSocketIo';


const NewMessageFeed = () => {
  const { user: myUser } = useAuthRedux();
  const userId = useParams()["id"];
  const navigate = useNavigate();
  const { clearNewChatUser, newChatUser, addNewChatRoom } = useChatRedux();
  const { emitMessage } = useSocketIo();
  const [ user, setUser ] = useState(null);
  const [isLoading, setIsLoading ] = useState(false);
  const [error, setError ] = useState(null);

  useEffect(() => {
    setError(null)
    if(newChatUser){
      setUser(newChatUser)
    } else {
      axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/auth/userData/${userId}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
      .then(res => setUser(res.data))
      .catch(err => setError(err.response.data.message))
    }

    return () => {
      clearNewChatUser()
      setUser(null)
      setError(null)
    }
  }, [userId])
  
  let image;
  if(user && user.UserDatum) image = JSON.parse(user.UserDatum.image);


  const handleSubmit = async (input) => {

    try {
      setError(null)
      setIsLoading(true)
      const { data } = await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/api/chat/new`,
      { message: input, receipientId: user.id }, 
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
      
      //add to chatRedux
      const result = { ChatRoom: 
        { id: data.ChatRoomId, 
          ChatMembers: [{ id: user.id, User: { username: user.username, id: user.id, UserDatum: user.UserDatum }}], 
          isLastMessageRead: [{isLastMessageRead: true}],
          ChatMessages: [{ id: 0, message: input, createdAt: data.createdAt, updatedAt: data.updatedAt, UserId: user.id, ChatRoomId: data.ChatRoomId}]
        } 
      }

      //emit to socketio
      emitMessage({
        isNew: true,
        message: input,
        ChatRoomId: data.ChatRoomId,
        users: [ parseInt(userId), myUser.id ],
        messageData: {ChatRoom: {...result.ChatRoom, ChatMembers: [{ id: myUser.id, User: { username: myUser.username, id: myUser.id, UserDatum: myUser.UserData }}]}}
      })

      addNewChatRoom(result)
      setIsLoading(false)
      navigate(`/messages/${data.ChatRoomId}`)
      
    } catch(err) {
      setIsLoading(false)
      setError(err.message)
    }
  }


  return (
    <Paper sx={{width: "100%", display: "flex", flexDirection: "column", overflow: "hidden", height: "100%"}}>
      <Box sx={{width: "100%", overflowY: "auto", display: "flex", flexDirection: "column", flex: 1, alignItems: "center"}}>
        {error && <Alert severity='error'>{error}</Alert>}
        {user &&  <>
          <Tooltip title="View Profile" arrow>
            <IconButton color="primary" sx={{mt: 3}} onClick={() => navigate(`/profile/${userId}`)}>
              {image ? 
                  <Image 
                      src={image.url} 
                      transformation={[{ height: 100, width: 100 }]} 
                      style={{borderRadius: "50%"}}
                      alt="profile-avatar"
                  /> : <img src={defaultAvatar} style={{height: "100px", width: "100px"}} alt="profile-avatar"/>
                  }
            </IconButton>
          </Tooltip>
          <Typography variant="body2">{user.username}</Typography>
          <Typography variant="body1" mb={3}>{user.UserDatum.firstName} {user.UserDatum.lastName}</Typography>
          <MaterialRoot><Divider/></MaterialRoot>
          <Typography variant="body1" my={2} sx={{opacity: .75}}>Start a conversation with {user.UserDatum.firstName}. Type your message on the input field below.</Typography>
        </>}
      </Box>
      <Divider/>
      <Box sx={{width: "100%"}}><MessageInput handleSubmit={handleSubmit} disabled={(error && true) || isLoading}/></Box>
    </Paper>
  )
}

export default NewMessageFeed