import { useState } from 'react'
import useAuthRedux from '../../hooks/useAuthRedux'
import Image from '../../components/Image';
import defaultAvatar from "../../assets/default-profile.png"
import { ListItem, Stack, Typography, Box, Modal, ButtonBase } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'


const MessageItem = ({ message, chatUser=null, createdAt, media }) => {
  const { user: { UserData, username } } = useAuthRedux();
  const [ showModal, setShowModal ] = useState(false);
  if(!chatUser) chatUser = {username, UserDatum: UserData, isSelf: true }

  return (
    <ListItem alignItems="flex-start" sx={{flexDirection: chatUser.isSelf ? "row-reverse": "row"}}>
        {chatUser.UserDatum && chatUser.UserDatum.image ? 
            <Image 
                src={JSON.parse(chatUser.UserDatum.image).url} 
                transformation={[{
                    height: 35,
                    width: 35,
                }]} 
                style={{borderRadius: "50%"}}
                alt="profile-avatar"
            /> : <img src={defaultAvatar} style={{height: "35px", width: "35px"}} alt="profile-avatar"/>
        }
        <Stack mx={1} width="100%" alignItems={chatUser.isSelf ? "flex-end": "flex-start"} justifyContent="space-between" height="100%" py={.25}>
          <Box sx={{display: "flex", flexDirection: chatUser.isSelf ? "row-reverse": "row", alignItems: "center"}}>
            <Typography variant="body2" fontSize={15} lineHeight={1}>{chatUser.username}</Typography>
            <Typography variant="body1" fontSize={10} lineHeight={1} mx={1}>{formatDistanceToNow(Date.parse(createdAt), { addSuffix: true, includeSeconds: true})}</Typography>
          </Box>
          <Typography variant="body1" sx={{overflowWrap: "break-word", maxWidth: "88%"}} lineHeight={1.25}>{message}</Typography>
          {media && <ButtonBase onClick={() => setShowModal(true)}>
            <Image 
              src={JSON.parse(media).url} 
              style={{maxHeight: "40vh", maxWidth: "40vw"}}
              alt={JSON.parse(media).url}
            />
          </ButtonBase>}
        </Stack>
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 10,
          }}>
            {media && <Image 
              src={JSON.parse(media).url} 
              style={{maxHeight: "90vh", maxWidth: "90vw"}}
              alt={JSON.parse(media).url}
            />}
          </Box>
        </Modal>
    </ListItem>
  )
}

export default MessageItem