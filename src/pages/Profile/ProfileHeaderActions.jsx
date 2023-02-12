import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import useAuthRedux from '../../hooks/useAuthRedux';
import useFriendRedux from '../../hooks/useFriendRedux';
import useMessagesActions from '../../hooks/useMessagesActions';
import useChatRedux from '../../hooks/useChatRedux';

import { Button, Box, Alert } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';

const ProfileHeaderActions = ({ user }) => {
  const { user: { id } } = useAuthRedux();
  const { sendRequest, sentRequests, friends, isLoading, error } = useFriendRedux();
  const { findChat, isLoading : isMessagesLoading, error: messagesError } = useMessagesActions();
  const { setNewChatUser } = useChatRedux();
  const UserId = useParams()["*"];
  const navigate = useNavigate();
  const isOwnProfile = !UserId || parseInt(UserId) === id;
  const isRequestSent = sentRequests && sentRequests.some(item => item.id === parseInt(UserId))
  const isFriends = friends && friends.some(item => item.id === parseInt(UserId))
  
  const handleSendRequestClick = () => {
    sendRequest(UserId)
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
      {isOwnProfile ? 
        <Button variant="contained" color="secondary" size='medium' sx={{mr: .5}} onClick={() => navigate("/settings")}><SettingsIcon fontSize="inherit" sx={{mr: 1}}/> Edit Profile</Button>
      :
        <Box>
          {isFriends && <Button variant="contained" color="info" size='medium' sx={{mr: .5}} onClick={() => console.log("click")} disabled={isLoading}>
            <PeopleIcon fontSize="inherit" sx={{mr: 1}}/> Friends

          </Button>}
          {!isFriends && (!isRequestSent ?
            <Button variant="contained" color="primary" size='medium' sx={{mr: .5}} onClick={() => handleSendRequestClick()} disabled={isLoading}>
              <PersonAddIcon fontSize="inherit" sx={{mr: 1}}/> Send Friend Request
            </Button>
          : <Button variant="contained" color="warning" size='medium' sx={{mr: .5, opacity: .85}} onClick={() => handleSendRequestClick()} disabled={isLoading}>
              <PersonAddDisabledIcon fontSize="inherit" sx={{mr: 1}}/> Cancel Friend Request
            </Button>)
          }
          <Button variant="outlined" color="secondary" size='medium'  sx={{ml: .5}} onClick={() => handleMessageClick()} disabled={isMessagesLoading}>
            <MessageIcon fontSize="inherit" sx={{mr: 1}}/> Send a Message
          </Button>
        </Box>}
    </>
  )
}

export default ProfileHeaderActions