import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Typography, Divider, Paper, Stack, Tooltip, IconButton, AvatarGroup, Avatar, Modal, List, ListItemButton, ListItemText } from '@mui/material';
import Image from "../../components/Image"
import defaultAvatar from "../../assets/default-profile.png"


const LikersModal = ({ showModal, setShowModal, likes }) => {
  const navigate = useNavigate();
  return (
    <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Paper sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: 320,
            boxShadow: 10,
            border: "0px solid transparent",
            p: 4,
            }}>
            <Typography variant="h6" sx={{m:1}}>Liked by: </Typography>
            <Divider/>
            <List component="div" sx={{ maxHeight: "60vh", overflowY: "auto"}}>
                {likes.map(item => <ListItemButton key={item.id} sx={{mt: .25}} onClick={() => navigate(`/profile/${item.UserId}`)}>
                    {item.User.UserDatum.image ? 
                        <Image 
                            src={JSON.parse(item.User.UserDatum.image).url} 
                            transformation={[{
                                height: 35,
                                width: 35,
                            }]} 
                            style={{borderRadius: "50%"}}
                            alt="profile-avatar"
                        /> :
                        <img src={defaultAvatar} style={{height: "35px", width: "35px"}} alt="profile-avatar"/>
                    }
                    <Stack ml={1}>
                        <Typography variant="body1" align='left'>{item.User.username}</Typography>
                        <Typography variant="body2" align='left'>{item.User.UserDatum.firstName} {item.User.UserDatum.lastName}</Typography>
                    </Stack>
                </ListItemButton>)}
            </List>
        </Paper>
    </Modal>
  )
}

export default LikersModal