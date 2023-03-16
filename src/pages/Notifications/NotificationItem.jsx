import { useState } from 'react'
import { Menu, MenuItem, Box, Typography, Stack, List, ListItem, Badge, IconButton } from '@mui/material'
import Image from '../../components/Image'
import defaultAvatar from "../../assets/default-profile.png"
import { formatDistanceToNow } from 'date-fns'
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

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


const NotificationItem = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = () => {
    console.log("ASD")
  }


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (action) => {
    handleClose()
  }

  return <ListItem 
  sx={{ background: item.isRead ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.025)", position: "relative" }} 
  key={item.id} 
  onClick={() => handleClick(item.link)}
  divider
  >
  <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: .5, py: {xs: 0, md:.25}}}>
    <Box>
      {item.ReferenceUser.UserDatum.image ? 
        <Image 
          src={JSON.parse(item.ReferenceUser.UserDatum.image).url} 
          transformation={[{
              height: 35,
              width: 35,
          }]} 
          style={{borderRadius: "50%"}}
          alt="profile-avatar"
          /> :
        <img src={defaultAvatar} alt="profile-avatar" style={{height: "35px", width: "35px"}}/>
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
    <Box sx={{position: "absolute", top: 4, right: 40}}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      ></StyledBadge>
    </Box>
  }
  <Box sx={{position: "absolute", top: 2, right: 0}}>
    <IconButton size="small"><MenuIcon fontSize="small"         
      id={`notification-item-button-${item.id}`}
      aria-controls={open ? `notification-item-menu-${item.id}` : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={e => setAnchorEl(e.currentTarget)}
    /></IconButton>

    <Menu
      id={`notification-item-menu-${item.id}`}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': `notification-item-button-${item.id}`,
      }}
    >
      <MenuItem onClick={() => handleItemClick("read")}>Mark as Read</MenuItem>
      <MenuItem onClick={() => handleItemClick("delete")}>Delete</MenuItem>
    </Menu>
  </Box>
</ListItem>
}

export default NotificationItem