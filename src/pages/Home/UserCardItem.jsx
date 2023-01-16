import React from 'react'
import { ListItemButton, ListItemText, Typography, IconButton, Stack, Badge, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import Image from '../../components/Image';
import ChatIcon from '@mui/icons-material/Chat';
import defaultAvatar from "../../assets/default-profile.png";

const StyledBadge = styled(Badge)(({ theme, status }) => {

  return ({
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
  })});
  
const UserCardItem = () => {
    let image = null;
  return (
    <ListItemButton sx={{ pl: 1.5, cursor: "default", py: 0.25 }} disableRipple={true} disableTouchRipple={true} >
        <ListItemText 
            primary={
              <Button color="secondary" sx={{textTransform: "initial", color: "initial", py: 0}}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  status="idle"
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
                </StyledBadge>
                <Stack ml={1}>
                  <Typography variant="body1" align='left'>@username</Typography>
                  <Typography variant="body2" align='left'>John Doe</Typography>
                </Stack>
            </Button>
            }    
        />

        <IconButton size="small" color="secondary"><ChatIcon fontSize="small"/></IconButton>
    </ListItemButton>
  )
}

export default UserCardItem