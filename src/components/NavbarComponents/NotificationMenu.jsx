import React from 'react'
import { useNavigate } from 'react-router-dom'
import useNotificationRedux from '../../hooks/useNotificationRedux'
import { MenuItem, Divider, Box, Stack, Typography } from '@mui/material'
import Image from '../Image'
import defaultAvatar from "../../assets/default-profile.png"
import { formatDistanceToNow } from 'date-fns'


const NotificationMenu = ({ handleNotificationMenuClose, setNotiAnchorEl}) => {
  const navigate = useNavigate();
  const { notifications } = useNotificationRedux();
  
  
  return (
    <>
      <Typography align="left" variant="h6" fontSize={16} ml={1}>Recent Notifications</Typography>
      <Divider/>
      {notifications.map(item => <MenuItem key={item.id} onClick={() => navigate(item.link)}>
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: .5, py: .25}}>
          <Box>
            {/* image here */}
            {item.ReferenceUser.UserDatum.image ? 
              <Image 
                src={JSON.parse(item.ReferenceUser.UserDatum.image.url)} 
                transformation={[{
                    height: 40,
                    width: 40,
                }]} 
                style={{borderRadius: "50%"}}
                alt="profile-avatar"
                /> :
              <img src={defaultAvatar} alt="profile-avatar" style={{height: "40px", width: "40px"}}/>
            }
          </Box>
          <Stack alignItems="left" justifyContent="left">
            <Typography align="left" variant="body2" fontSize={13} lineHeight={1.2} sx={{opacity: .85}}>{item.ReferenceUser.username} {item.title}</Typography>
            <Typography align="left" variant="body1" fontSize={10} lineHeight={1} >{formatDistanceToNow(Date.parse(item.createdAt), { addSuffix: true, includeSeconds: true})}</Typography>
          </Stack>
        </Box>
      </MenuItem>)}
      <MenuItem ><Typography align="center" color="secondary" fontWeight={500}>See All</Typography></MenuItem>
    </>
  )
}

export default NotificationMenu