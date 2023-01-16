import { useState } from 'react'
import { Paper, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, IconButton } from "@mui/material"
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';
const FriendsList = () => {
  const [ showOnlineFriends, setShowOnlineFriends ] = useState(false);
  const [ showOfflineFriends, setShowOfflineFriends ] = useState(false);

  return (
    <>
        <Typography letterSpacing={.2} fontWeight={500} variant="h6" fontSize={16} textAlign="left" >Friends:</Typography>
        <ListItemButton onClick={() => setShowOnlineFriends(prevState => !prevState)} sx={{width: "100%"}}>
          <ListItemText primary={`Online Friends (0)`}  sx={{fontSize: 14}}/>
          {showOnlineFriends ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={showOnlineFriends} timeout="auto" unmountOnExit sx={{width: "100%"}}>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4, cursor: "default" }} >
              <ListItemText primary="test"  sx={{width: "100%"}}/>
              <IconButton size="small" color="secondary"><ChatIcon/></IconButton>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, cursor: "default" }} >
              <ListItemText primary="test"  sx={{width: "100%"}}/>
              <IconButton size="small" color="secondary"><ChatIcon/></IconButton>
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => setShowOfflineFriends(prevState => !prevState)} sx={{width: "100%"}}>
          <ListItemText primary={`Offline Friends (0)`} sx={{fontSize: 14}}/>
          {showOfflineFriends ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
    </>
  )
}

export default FriendsList