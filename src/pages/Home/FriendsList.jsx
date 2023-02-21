import { useState } from 'react'
import useFriendRedux from "../../hooks/useFriendRedux"
import { Typography, List, ListItemButton, ListItemText, Collapse, Box, Alert } from "@mui/material"
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import LoadingSpinner from "../../components/LoadingSpinner"
import UserCardItem from './UserCardItem';
const FriendsList = () => {
  const [ showFriendRequests, setShowFriendRequests ] = useState(true);
  const [ showOnlineFriends, setShowOnlineFriends ] = useState(true);
  const [ showOfflineFriends, setShowOfflineFriends ] = useState(false);
  const { friends, friendRequests, isLoading, error, confirmRequest } = useFriendRedux();

  const handleFriendRequestClick = ({isConfirmed, id}) => {
    confirmRequest({id, data: { isConfirmed }})
  }


  return (
    <>
      {error && <Alert severity='error' sx={{width: "100%"}}>{error}</Alert>}
      {isLoading && <Box alignItems="center" justifyContent="center" width="100%">
        <LoadingSpinner isModal={false} style={{minHeight: "0em", height: "1em", backgroundColor: "initial", transform: "scale(.3)", opacity: .5}}/>
      </Box>}
      {friends && <>
        <Typography letterSpacing={.2} fontWeight={500} variant="h6" fontSize={16} align="left">Friends:</Typography>
        {friendRequests.length !== 0 && <>
          <ListItemButton onClick={() => setShowFriendRequests(prevState => !prevState)} sx={{width: "100%"}}>
            <ListItemText primary={`Friend Requests (${friendRequests.length})`}  sx={{fontSize: 14 }}/>
            {showFriendRequests ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={showFriendRequests} timeout="auto" unmountOnExit sx={{width: "100%"}}>
            <List component="div" disablePadding>
              {friendRequests.map(item => <UserCardItem key={item.id} user={item} disableStatus isFriendRequest handleFriendRequestClick={handleFriendRequestClick} isButtonDisabled={isLoading}/>)}
            </List>
          </Collapse>
        </>}

        <ListItemButton onClick={() => setShowOnlineFriends(prevState => !prevState)} sx={{width: "100%"}}>
          <ListItemText primary={`Online Friends (0)`}  sx={{fontSize: 14}}/>
          {showOnlineFriends ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={showOnlineFriends} timeout="auto" unmountOnExit sx={{width: "100%"}}>
          <List component="div" disablePadding>
            {/* <UserCardItem status="online"/>
            <UserCardItem status="idle"/>
            <UserCardItem status="invisible"/> */}
          </List>
        </Collapse>
        <ListItemButton onClick={() => setShowOfflineFriends(prevState => !prevState)} sx={{width: "100%"}}>
          <ListItemText primary={`Offline Friends (0)`} sx={{fontSize: 14}}/>
          {showOfflineFriends ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </>}
    </>
  )
}

export default FriendsList