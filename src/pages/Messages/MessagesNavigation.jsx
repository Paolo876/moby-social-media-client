import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Paper, Grid, Divider, List, ListItemButton, ListItem, Stack, Typography, Alert, Box } from '@mui/material'
import SearchUserForm from './SearchUserForm'
import MaterialRoot from '../../components/MaterialRoot'
import useChatRedux from '../../hooks/useChatRedux'
import LoadingSpinner from '../../components/LoadingSpinner'
import Image from '../../components/Image'
import defaultAvatar from "../../assets/default-profile.png"


const MessagesNavigation = () => {
  const navigate = useNavigate();
  const params = useParams()["*"]
  const { getChatRooms, isLoading, error, chatRooms } = useChatRedux();
  useEffect(() => {
    if(chatRooms.length === 0) getChatRooms()
  }, [])

  return (
    <Paper sx={{width: "100%", display: "flex", flexDirection: "column", overflow: "hidden", height: "100%"}}>
      <Box sx={{width: "100%"}}><SearchUserForm/></Box>
      <Divider/>
        <List sx={{width: "100%", overflowY: "auto", display: "flex", flexDirection: "column"}}>
          <ListItem alignItems="flex-start" sx={{justifyContent: "center", p:0, overflow: "hidden"}}>
            {isLoading && <LoadingSpinner style={{minHeight: "0em", backgroundColor: "initial", transform: "scale(.45)", opacity: .75}}/>}
          </ListItem>
          {chatRooms && chatRooms.map(({ ChatRoom }) => 
            <ListItemButton sx={{ }} key={ChatRoom.id} disabled={isLoading} onClick={() => navigate(`/messages/${ChatRoom.id}`)} selected={ChatRoom.id === parseInt(params)}>
              {ChatRoom.ChatMembers[0].User.UserDatum && ChatRoom.ChatMembers[0].User.UserDatum.image ? 
                <Image 
                  src={JSON.parse(ChatRoom.ChatMembers[0].User.UserDatum.image).url} 
                  transformation={[{
                      height: 50,
                      width: 50,
                  }]} 
                  style={{borderRadius: "50%"}}
                  alt="profile-avatar"
                /> : <img src={defaultAvatar} style={{height: "50px", width: "50px"}} alt="profile-avatar"/>
              }
              <Stack ml={1} width="100%">
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography variant="body2" align='left'>{ChatRoom.ChatMembers[0].User.username}</Typography>
                  <Typography variant="body2" align='right' fontSize={".7em"} fontWeight={300}>{new Date(ChatRoom.ChatMessages[0].createdAt).toLocaleDateString()}</Typography>
                </Stack>
                <Typography variant="body1" align='left' fontSize={".8em"} >
                  {ChatRoom.ChatMessages[0].message.length > 45 ? `${ChatRoom.ChatMessages[0].message.substr(0,40)}...` : ChatRoom.ChatMessages[0].message}
                  </Typography>
              </Stack>
            </ListItemButton>
          )}
        </List>

    </Paper>
  )
}

export default MessagesNavigation