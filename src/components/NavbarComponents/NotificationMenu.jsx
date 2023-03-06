import React from 'react'
import { useNavigate } from 'react-router-dom'
import useNotificationRedux from '../../hooks/useNotificationRedux'
import { MenuItem, Divider, Box, Stack, Typography } from '@mui/material'
import Image from '../Image'
import defaultAvatar from "../../assets/default-profile.png"

const NotificationMenu = ({ handleNotificationMenuClose, setNotiAnchorEl}) => {
  const navigate = useNavigate();
  const { notifications } = useNotificationRedux();
  
  
  return (
    <>
      {notifications.map(item => <MenuItem key={item.id} onClick={() => navigate(item.link)}>
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: 1.5, py: .75, pl: 1, pr: 2}}>
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
            <Typography align="left" color="white" variant="h6" fontSize={14} lineHeight={1.4}>{item.title}</Typography>
            <Typography align="left" color="white" variant="body2" fontSize={13} lineHeight={1.2} sx={{opacity: .75}}>{header}</Typography>
            <Typography align="left" color="white" variant="body1" fontSize={11} lineHeight={1.2} sx={{opacity: .8}}>{subheader}</Typography>
          </Stack>
        </Box>
      </MenuItem>)}
    </>
  )
}

export default NotificationMenu