import React from 'react'
import useAuthRedux from '../../hooks/useAuthRedux'
import Image from '../../components/Image';
import defaultAvatar from "../../assets/default-profile.png"
import { ListItem, Stack, Typography, Box } from '@mui/material'


const MessageItem = ({ message, chatUser=null, createdAt }) => {
  const { user: { UserData, username } } = useAuthRedux();
  if(!chatUser) chatUser = {username, UserDatum: UserData, isSelf: true }
  return (
    <ListItem alignItems="flex-start" sx={{flexDirection: chatUser.isSelf ? "row-reverse": "row"}}>
        {chatUser.UserDatum && chatUser.UserDatum.image ? 
            <Image 
                src={JSON.parse(chatUser.UserDatum.image).url} 
                transformation={[{
                    height: 35,
                    width: 35,
                }]} 
                style={{borderRadius: "50%"}}
                alt="profile-avatar"
            /> : <img src={defaultAvatar} style={{height: "35px", width: "35px"}} alt="profile-avatar"/>
        }
        <Stack mx={1} width="100%" alignItems={chatUser.isSelf ? "flex-end": "flex-start"}>
          <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <Typography variant="body2">{chatUser.username}</Typography>
            <Typography variant="body1" fontSize={11}>{new Date(createdAt).toLocaleDateString()}</Typography>
          </Box>
          <Typography variant="body1">{message}</Typography>
        </Stack>
    </ListItem>
  )
}

export default MessageItem