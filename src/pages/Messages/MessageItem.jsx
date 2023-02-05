import React from 'react'
import useAuthRedux from '../../hooks/useAuthRedux'
import Image from '../../components/Image';
import defaultAvatar from "../../assets/default-profile.png"
import { ListItem, Stack, Typography, Box } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'


const MessageItem = ({ message, chatUser=null, createdAt }) => {
  const { user: { UserData, username } } = useAuthRedux();
  if(!chatUser) chatUser = {username, UserDatum: UserData, isSelf: true }
  return (
    <ListItem alignItems="flex-start" sx={{flexDirection: chatUser.isSelf ? "row-reverse": "row"}}>
        {chatUser.UserDatum && chatUser.UserDatum.image ? 
            <Image 
                src={JSON.parse(chatUser.UserDatum.image).url} 
                transformation={[{
                    height: 40,
                    width: 40,
                }]} 
                style={{borderRadius: "50%"}}
                alt="profile-avatar"
            /> : <img src={defaultAvatar} style={{height: "40px", width: "40px"}} alt="profile-avatar"/>
        }
        <Stack mx={1} width="100%" alignItems={chatUser.isSelf ? "flex-end": "flex-start"} justifyContent="space-between" height="100%" py={.25}>
          <Box sx={{display: "flex", flexDirection: chatUser.isSelf ? "row-reverse": "row", alignItems: "center"}}>
            <Typography variant="body2" fontSize={15} lineHeight={1}>{chatUser.username}</Typography>
            <Typography variant="body1" fontSize={10} lineHeight={1} mx={1}>{formatDistanceToNow(Date.parse(createdAt))} ago</Typography>
          </Box>
          <Typography variant="body1">{message}</Typography>
        </Stack>
    </ListItem>
  )
}

export default MessageItem