import { useState } from 'react'
import { Paper, Typography, List, ListItem, ListItemButton, ListItemIcon, Stack, Divider } from "@mui/material"
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const FriendsList = () => {
  const [ showOnlineFriends, setShowOnlineFriends ] = useState(false);
  const [ showOfflineFriends, setShowOfflineFriends ] = useState(false);
  return (
    <>
        <Typography letterSpacing={.2} fontWeight={500} variant="h6" fontSize={16} textAlign="left" >Friends:</Typography>
        <List>
            
        </List>
    </>
  )
}

export default FriendsList