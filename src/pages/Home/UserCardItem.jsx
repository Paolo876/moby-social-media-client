import React from 'react'
import { useNavigate } from "react-router-dom"
import { ListItemButton, ListItemText, Typography, IconButton, Stack, Badge, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import Image from '../../components/Image';
import ChatIcon from '@mui/icons-material/Chat';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import defaultAvatar from "../../assets/default-profile.png";

const StyledBadge = styled(Badge)(({ theme, status }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: theme.palette.userStatus[status],
      color: theme.palette.userStatus[status],
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: status === "online" ? 'ripple 1.2s infinite ease-in-out' : "none",
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
  
const UserCardItem = ({ status="invisible", user, disableStatus=false, isFriendRequest=false, handleFriendRequestClick, isButtonDisabled }) => {
  const navigate = useNavigate();
  let image = null;
  let opacity = .6;
  if (status === "online" || (status === "invisible" && isFriendRequest)){
    opacity = 1;
  } else if (status === "idle"){
    opacity = .75;
  }
  
  const handleMessageClick = (e) => {
    e.stopPropagation();
    console.log("messge click")
  }

  const handleFriendRequestActions = ({e, isConfirmed, id}) => {
    e.stopPropagation();
    handleFriendRequestClick({ isConfirmed, id})
  }


  return (
    <ListItemButton sx={{ pl: 1, cursor: "", py: 0.25 }} disableRipple={true} disableTouchRipple={true} onClick={() => navigate(`/profile/${user.id}`)}>
        <ListItemText 
            primary={
              <Box sx={{textTransform: "initial", color: "initial", py: 0, opacity, display: "flex", flexDirection: "row"}} >
                {disableStatus ? 
                <>
                  {image ? 
                    <Image 
                      src={image.url} 
                      transformation={[{
                        height: 28,
                        width: 28,
                      }]} 
                      style={{borderRadius: "50%"}}
                      alt="profile-avatar"
                    /> :
                    <img src={defaultAvatar} style={{height: "35px", width: "35px"}} alt="profile-avatar"/>
                  }
                </>
                :<StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  status={status}
                >
                  {image ? 
                    <Image 
                        src={image.url} 
                        transformation={[{
                            height: 28,
                            width: 28,
                        }]} 
                        style={{borderRadius: "50%"}}
                        alt="profile-avatar"
                    /> :
                    <img src={defaultAvatar} style={{height: "35px", width: "35px"}} alt="profile-avatar"/>
                  }
                </StyledBadge>}
                <Stack ml={1} sx={{overflow: "hidden"}}>
                  <Typography variant="body1" align='left' noWrap>{user.username}</Typography>
                  <Typography variant="body2" align='left' noWrap>{user.UserDatum.firstName} {user.UserDatum.lastName}</Typography>
                </Stack>
            </Box>
            }
            sx={{overflow: "hidden"}} 
        />
        {isFriendRequest ? 
          <>
          <IconButton size="small" color="primary" onClick={(e) => handleFriendRequestActions({e, isConfirmed: true, id: user.id})} disabled={isButtonDisabled}><CheckIcon fontSize="small"/></IconButton>
          <IconButton size="small" color="error" onClick={(e) => handleFriendRequestActions({e, isConfirmed: false, id: user.id})} disabled={isButtonDisabled}><CloseIcon fontSize="small"/></IconButton>
          </>
        :
          <IconButton size="small" color="secondary" sx={{p:1}} onClick={handleMessageClick}><ChatIcon fontSize="small"/></IconButton>
        }
    </ListItemButton>
  )
}

export default UserCardItem