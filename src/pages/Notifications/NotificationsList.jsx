import { useState } from 'react'
import useNotificationRedux from "../../hooks/useNotificationRedux"
import Image from '../../components/Image'
import defaultAvatar from "../../assets/default-profile.png"
import { Alert, Container, Grid, Box, Paper, Typography, Divider, Button, ButtonBase, Stack, List, ListItem, Badge } from '@mui/material'
import { styled } from '@mui/material/styles';
import { formatDistanceToNow } from 'date-fns'
import FilterAltIcon from '@mui/icons-material/FilterAlt';


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


const NotificationsList = () => {
  const { notifications } = useNotificationRedux();
  // const [ filteredNotifications, setFilteredNotifications ] = useState(notifications);
  const [ filter, setFilter ] = useState("all")
  const handleClick = () => {
    
  }
  return (
    <>
    <Box>
      <Button endIcon={<FilterAltIcon/>} size="small" variant="contained" color="secondary">Filter</Button>
    </Box>
      <List>
        {notifications.map(item => <ListItem 
          sx={{ background: item.isRead ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.025)", position: "relative" }} 
          key={item.id} 
          onClick={() => handleClick(item.link)}
          divider
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
        </ListItem>)}

      </List>
    </>
  )
}

export default NotificationsList