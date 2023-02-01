import { useState, useEffect } from 'react'
import { Paper, Grid, Divider, List, ListItemButton, ListItem, Stack, Typography } from '@mui/material'
import SearchUserForm from './SearchUserForm'
import MaterialRoot from '../../components/MaterialRoot'
import useMessagesActions from '../../hooks/useMessagesActions'
import LoadingSpinner from '../../components/LoadingSpinner'
import Image from '../../components/Image'
import defaultAvatar from "../../assets/default-profile.png"


const MessagesNavigation = () => {
  const [ messagesList, setMessagesList ] = useState(null)
  const { getChatRooms, isLoading, error } = useMessagesActions();

  useEffect(() => {
    getChatRooms().then(data => setMessagesList(data))
  }, [])
  // console.log(messagesList)
  return (
    <Paper sx={{height: "100%"}}>
      <Grid container>
        <Grid item xs={12}><SearchUserForm/></Grid>
        <MaterialRoot><Divider/></MaterialRoot>
        <List sx={{width: "100%"}}>
          <ListItem alignItems="flex-start" sx={{justifyContent: "center", p:0}}>
            {isLoading && <LoadingSpinner style={{minHeight: "0em", backgroundColor: "initial", transform: "scale(.6)", opacity: .75}}/>}
          </ListItem>
          {messagesList && messagesList.map(({ ChatRoom }) => 
            <ListItemButton sx={{ }} key={ChatRoom.id} disabled={isLoading} onClick={() => console.log(ChatRoom.id)}>
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
              <Stack ml={1}>
                <Typography variant="body2" align='left'>{ChatRoom.ChatMembers[0].User.username}</Typography>
                <Typography variant="body1" align='left' fontSize={".8em"}>{ChatRoom.ChatMessages[0].message}</Typography>
              </Stack>
            </ListItemButton>
          )}
        </List>
      </Grid>
    </Paper>
  )
}

export default MessagesNavigation