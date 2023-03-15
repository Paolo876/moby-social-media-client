import React from 'react'
import { useNavigate } from 'react-router-dom'
import useNotificationRedux from '../../hooks/useNotificationRedux'
import { MenuItem, Divider, Box, Stack, Typography, Badge, Menu } from '@mui/material'
import { styled } from '@mui/material/styles';
import Image from '../Image'
import defaultAvatar from "../../assets/default-profile.png"
import { formatDistanceToNow } from 'date-fns'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.light,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));



const NotificationMenu = ({ handleNotificationMenuClose, setNotiAnchorEl}) => {
  const navigate = useNavigate();
  const { notifications } = useNotificationRedux();
  
  const handleClick = (link) => {
    navigate(link)
    handleNotificationMenuClose()
  }

  return (
    <>
      <Typography align="left" variant="h6" fontSize={16} ml={1} mb={.5} minWidth={220}>Recent Notifications</Typography>
      <Divider/>
      <Box sx={{overflowY: "auto", maxHeight: "75vh", minWidth: 260}}>
        {notifications.map(item => <MenuItem 
          sx={{ background: item.isRead ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.025)", position: "relative" }} 
          key={item.id} 
          onClick={() => handleClick(item.link)}
          >
          <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: .5, py: .25}}>
            <Box>
              {item.ReferenceUser.UserDatum.image ? 
                <Image 
                  src={JSON.parse(item.ReferenceUser.UserDatum.image).url} 
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
              <Typography align="left" variant="body2" fontSize={13} sx={{opacity: .85, pr: .5}}>
                {item.ReferenceUser.username}
                {item.type === "comment" && " commented on your post"}
                {item.type === "like" && " liked your post"}
                </Typography>
              <Typography align="left" variant="body1" fontSize={10} mt={.25}>{formatDistanceToNow(Date.parse(item.updatedAt), { addSuffix: true, includeSeconds: true })}</Typography>
            </Stack>
          </Box>
          {!item.isRead &&
            <Box sx={{position: "absolute", top: 2, right: 12}}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              ></StyledBadge>
            </Box>
          }
        </MenuItem>)}
      </Box>
      {notifications.length > 0 && <MenuItem onClick={() => handleClick("/notifications")}><Typography align="center" color="secondary" fontWeight={500} fontSize={15}>See All</Typography></MenuItem>}
      {notifications.length === 0 && <Box><Typography align="left" fontWeight={300} fontSize={15} p={1} fontStyle="italic">You have no notifications.</Typography></Box>}
    </>
  )
}

export default NotificationMenu