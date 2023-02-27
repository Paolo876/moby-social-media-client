import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthRedux from '../../hooks/useAuthRedux';
import useFriendRedux from '../../hooks/useFriendRedux';
import useMessagesActions from '../../hooks/useMessagesActions';
import useChatRedux from '../../hooks/useChatRedux';
import useSocketIo from '../../hooks/useSocketIo';
import SplitButton from "../../components/SplitButton"

import { Button, Box, Alert, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import FriendsButton from './FriendsButton';
import useProfileActions from '../../hooks/useProfileActions';

const ProfileHeaderActions = ({ user }) => {
  const { user: myUser } = useAuthRedux();
  const { emitFriendRequest } = useSocketIo();
  const { sendRequest, isLoading, error } = useProfileActions();
  const { sentRequests, friendRequests, friends, sendRequestRedux} = useFriendRedux();
  const { findChat, isLoading : isMessagesLoading, error: messagesError } = useMessagesActions();
  const { setNewChatUser } = useChatRedux();
  const UserId = useParams()["*"];
  const navigate = useNavigate();
  const isOwnProfile = !UserId || parseInt(UserId) === myUser.id;
  const isRequestSent = sentRequests && sentRequests.some(item => item.id === parseInt(UserId));
  const isUserSentRequest = friendRequests && friendRequests.some(item => item.id === parseInt(UserId));
  const isFriends = friends && friends.some(item => item.id === parseInt(UserId))
  
  
  const handleSendRequestClick = async () => {
    const result = await sendRequest(UserId)
    emitFriendRequest({requestData: {...result, FriendId: myUser.id, User: {username: myUser.username, id: myUser.id, UserDatum: myUser.UserData}}, requesteeId: UserId}) //emit to this user's socket
    sendRequestRedux(result)  //update redux
  }

  
  const handleMessageClick = async () => {
    const result = await findChat(UserId);
    if(result.ChatRoomId){
      navigate(`/messages/${result.ChatRoomId}`)
    } else {
      setNewChatUser(user)
      navigate(`/messages/new/${UserId}`)
    }
  }


  return (
    <>
      {error && <Alert severity='error'>{error}</Alert>}
      {messagesError && <Alert severity='error'>{messagesError}</Alert>}
      {isOwnProfile ? 
        <Button variant="contained" color="secondary" size='medium' sx={{m: .5}} onClick={() => navigate("/settings")} startIcon={<SettingsIcon/>}>Edit Profile</Button>
      :
        <Box>
          {isFriends && <FriendsButton id={UserId}/>}
          {!isFriends && !isUserSentRequest && (!isRequestSent ?
            <Button variant="contained" color="primary" size='medium' sx={{m: .5}} onClick={() => handleSendRequestClick()} disabled={isLoading} startIcon={<PersonAddIcon/>}>
              Send Friend Request
            </Button>
          : <Button variant="contained" color="warning" size='medium' sx={{m: .5, opacity: .85}} onClick={() => handleSendRequestClick()} disabled={isLoading} startIcon={<PersonAddDisabledIcon/>}>
              Cancel Friend Request
            </Button>)
          }
          {!isFriends && !isRequestSent && isUserSentRequest && <ConfirmButtonGroup id={UserId}/>}

          <Button variant="outlined" color="secondary" size='medium'  sx={{m: .5}} onClick={() => handleMessageClick()} disabled={isMessagesLoading} startIcon={<MessageIcon/>}>
             Send a Message
          </Button>
        </Box>}
    </>
  )
}

const ConfirmButtonGroup = ({ id }) => {
  const [ selectedIndex, setSelectedIndex ] = useState(0);
  const { confirmRequest, isLoading } = useFriendRedux();

  const handleSubmit = (index) => {
    confirmRequest({id, data: { isConfirmed: index === 0 ? true : false }})
  }

  return <SplitButton 
    options={[
      <Typography textTransform="uppercase" fontWeight={500} variant="h6" fontSize={13}><HowToRegIcon sx={{mx:.5, }} fontSize="inherit" color="inherit"/>Confirm Friend Request</Typography>, 
      <Typography textTransform="uppercase" fontWeight={500} variant="h6" fontSize={13}><PersonOffIcon sx={{mx:.5}} fontSize="inherit"  color="error"/>Decline Friend Request</Typography>
    ]} 
    variant="contained"
    color="info"
    placement="bottom-end"
    selectedIndex={selectedIndex}
    setSelectedIndex={setSelectedIndex}
    handleSubmit={handleSubmit}
    disabled={isLoading}
    />
}

export default ProfileHeaderActions