import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthRedux from '../../hooks/useAuthRedux';
import Image from '../../components/Image';
import defaultAvatar from "../../assets/default-profile.png"
import { Stack, Avatar, AvatarGroup, Divider, Typography, Tooltip, Modal, Box, List, ListItemButton } from '@mui/material'

const modalStyle = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 300,
    borderRadius: 1,
    bgcolor: 'background.paper',
    boxShadow: 10,
    py: 1,
  };


const ChatMembersHeader = ({ chatMembers }) => {
  const { user: { UserData, username } } = useAuthRedux();
  const [ showModal, setShowModal ] = useState(false);


  return (
    <Stack width="100%" pt={.5}>
      <Stack flexDirection="row" alignItems="center" px={1} py={1}>
        <Typography variant="h6" fontSize={17} mx={1}>Chat Members: </Typography>
        <Tooltip title="Show Chat Members" arrow>
          <AvatarGroup
            total={chatMembers.length + 1}
            max={3}   
            sx={{ mx:1, '& .MuiAvatar-root': { width: 25, height: 25, fontSize: 12, cursor: "pointer" }}}
            onClick={() => setShowModal(true)}
            >
            {chatMembers.map(item => <Avatar 
              key={item.id} 
              alt={item.User.username} 
              src={item.User.UserDatum && item.User.UserDatum.image ? JSON.parse(item.User.UserDatum.image).url : null}
              sx={{width: 25, height: 25}} 
            />)}
            <Avatar 
              alt={username} 
              src={UserData.image ? JSON.parse(UserData.image).url : null}
              sx={{width: 25, height: 25}}  
            />
          </AvatarGroup>
        </Tooltip>
      </Stack>
      {showModal && <ChatMembersModal showModal={showModal} handleCloseModal={() => setShowModal(false)} chatMembers={chatMembers}/>}
      <Divider/>
    </Stack>
  )
}

const ChatMembersModal = ({ showModal, handleCloseModal, chatMembers }) => {
  const navigate = useNavigate();
  const { user: { UserData, username } } = useAuthRedux();

  return (
    <Modal
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleCloseModal}
    >
        <Box sx={modalStyle}>
            <Typography variant="h6" fontSize={17} mx={1} p={1} >Chat Members: </Typography>
            <Divider/>
            <List>
              {chatMembers && chatMembers.map(({ User}) => 
                <ListItemButton key={User.id} onClick={() => navigate(`/profile/${User.id}`)}>
                  {User.UserDatum && User.UserDatum.image ? 
                    <Image 
                      src={JSON.parse(User.UserDatum.image).url} 
                      transformation={[{
                          height: 35,
                          width: 35,
                      }]} 
                      style={{borderRadius: "50%"}}
                      alt="profile-avatar"
                    /> : <img src={defaultAvatar} style={{height: "35px", width: "35px"}} alt="profile-avatar"/>
                  }
                  <Stack ml={1}>
                    <Typography variant="body1" align='left'>{User.username}</Typography>
                    {User.UserDatum && <Typography variant="body2" align='left'>{User.UserDatum.firstName} {User.UserDatum.lastName}</Typography>}
                  </Stack>
                </ListItemButton>
              )}
              <ListItemButton onClick={() => navigate(`/profile/${UserData.UserId}`)}>
                  {UserData.image ? 
                    <Image 
                      src={JSON.parse(UserData.image).url} 
                      transformation={[{
                          height: 35,
                          width: 35,
                      }]} 
                      style={{borderRadius: "50%"}}
                      alt="profile-avatar"
                    /> : <img src={defaultAvatar} style={{height: "35px", width: "35px"}} alt="profile-avatar"/>
                  }
                  <Stack ml={1}>
                    <Typography variant="body1" align='left'>{username} <small>(you)</small></Typography>
                    <Typography variant="body2" align='left'>{UserData.firstName} {UserData.lastName}</Typography>
                  </Stack>
                </ListItemButton>
            </List>
        </Box>
    </Modal>
    )
}

export default ChatMembersHeader