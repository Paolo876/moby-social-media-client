import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import useAuthRedux from '../../hooks/useAuthRedux';
import useMessagesActions from '../../hooks/useMessagesActions';
import useChatRedux from '../../hooks/useChatRedux';
import { Button, Box } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';

const ProfileHeaderActions = ({ user}) => {
  const { user: { id } } = useAuthRedux();
  const { findChat, isLoading, error } = useMessagesActions();
  const { setNewChatUser } = useChatRedux();
  const UserId = useParams()["*"];
  const navigate = useNavigate();
  const isOwnProfile = !UserId || parseInt(UserId) === id;


  const handleSendRequestClick = () => {
    
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
          <Button variant="contained" color="primary" size='medium' sx={{mr: .5}} onClick={() => handleSendRequestClick()}><PersonAddIcon fontSize="inherit" sx={{mr: 1}}/> Send Friend Request</Button>
          <Button variant="outlined" color="secondary" size='medium'  sx={{ml: .5}} onClick={() => handleMessageClick()}><MessageIcon fontSize="inherit" sx={{mr: 1}}/> Send a Message</Button>
        </Box>}
    </>
  )
}

export default ProfileHeaderActions