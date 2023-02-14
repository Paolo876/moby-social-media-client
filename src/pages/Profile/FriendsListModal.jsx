import { useNavigate } from "react-router-dom";
import Image from "../../components/Image";
import defaultAvatar from "../../assets/default-profile.png"
import { Typography, Modal, Divider, List, ListItemButton, Stack, Box } from "@mui/material"

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FriendsListModal({ open, handleClose, friendsList }) {
  const navigate = useNavigate();
  console.log(friendsList)
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" fontSize={17} mx={1} p={1} >Friends: </Typography>
        <Divider/>
        <List>
          {friendsList && friendsList.map((item) => 
            <ListItemButton key={item.id} onClick={() => navigate(`/profile/${item.id}`)}>
              {item.UserDatum && item.UserDatum.image ? 
                <Image 
                  src={JSON.parse(item.UserDatum.image).url} 
                  transformation={[{
                      height: 35,
                      width: 35,
                  }]} 
                  style={{borderRadius: "50%"}}
                  alt="profile-avatar"
                /> : <img src={defaultAvatar} style={{height: "35px", width: "35px"}} alt="profile-avatar"/>
              }
              <Stack ml={1}>
                <Typography variant="body1" align='left'>{item.username}</Typography>
                {item.UserDatum && <Typography variant="body2" align='left'>{item.UserDatum.firstName} {item.UserDatum.lastName}</Typography>}
              </Stack>
            </ListItemButton>
          )}
        </List>
      </Box>
    </Modal>
  );
}