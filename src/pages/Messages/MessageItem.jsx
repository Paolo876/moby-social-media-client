import React from 'react'
import useAuthRedux from '../../hooks/useAuthRedux'
import Image from '../../components/Image';
import defaultAvatar from "../../assets/default-profile.png"
import { ListItem, ListItemText } from '@mui/material'


const MessageItem = ({ message, chatUser=null }) => {
  const { user: { UserData, username } } = useAuthRedux();
  if(!chatUser) chatUser = {username, UserDatum: UserData }
  console.log(chatUser)
  return (
    <ListItem sx={{}}>
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
        <ListItemText primary={message} />
    </ListItem>
  )
}

export default MessageItem