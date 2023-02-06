import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthRedux from '../../hooks/useAuthRedux';
import useChatRedux from '../../hooks/useChatRedux';
import { Typography, Stack, Tooltip, Button, Box, Modal, TextField, List, ListItemButton, ListItem, Fade } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import LoadingSpinner from "../../components/LoadingSpinner"
import defaultAvatar from "../../assets/default-profile.png"
import Image from '../../components/Image';


const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  borderRadius: 1,
  bgcolor: 'background.paper',
  boxShadow: 10,
  p: 2,
};


const SearchUserForm = () => {
  const { user } = useAuthRedux();
  const { setNewChatUser } = useChatRedux();
  const navigate = useNavigate();
  const [ showModal, setShowModal ] = useState(false);
  const [ input, setInput ] = useState("")
  const [ inputResponse, setInputResponse ] = useState("");
  const [ users, setUsers ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    let timeout;
    if(input.trim().length === 0) {
      setUsers(null)
      setIsLoading(false)
    };
    if(input.trim().length !== 0 && inputResponse.toLowerCase() !== input.toLowerCase()){
      setIsLoading(true)
      timeout = setTimeout(() => {
        setInputResponse(input)
        axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/auth/search/${input}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
        .then(res => {
          setUsers(res.data)
          setIsLoading(false)
        })
      }, 500);
    
    }
    return () => clearTimeout(timeout)
  }, [input]);

  const handleCloseModal = () => {
    setShowModal(false)
    setInput("")
    setInputResponse("")
    setUsers(null)
    setIsLoading(false)
  }

  const findChat = (id) => {
    //find chat id, redirect user to link
    axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/chat/search/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
    .then( ({ data }) => {
      if(data.ChatRoomId){
        navigate(`/messages/${data.ChatRoomId}`)
      } else {
        const user = users.find(item => item.id === id);
        setNewChatUser(user)
        navigate(`/messages/new/${id}`)
      }
      handleCloseModal()
    })
  }
  return (
    <Stack flexDirection="row" alignItems="center" justifyContent="center" mx={2} my={2} >
        <Box backgroundColor="rgba(0,0,0,0.1)" borderRadius={4}  sx={{flex:1, height: "100%", py:.25, mx: .5}} >
            <Typography variant="h6" fontSize={16} align="center">{user.username}</Typography>
        </Box>
        <Tooltip title="Write a new message" arrow>
            <Button color="secondary" size="small" variant="contained" sx={{minWidth: 0, ml: 1}} onClick={() => setShowModal(true)}><EditIcon fontSize='small'/></Button>
        </Tooltip>

        {/* modal */}
        <Modal
          open={showModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          onClose={handleCloseModal}
          closeAfterTransition
        >
          <Fade in={showModal}>

            <Box sx={style}>
              <Typography variant="h6" align="left" mb={2}>Send a New Message</Typography>
              <TextField 
                id="standard-basic" 
                label="Enter Receipient's Name" 
                variant="standard" 
                fullWidth 
                sx={{mb:2}}
                value={input}  
                autoFocus
                onChange={e => setInput(e.target.value)}
                />
              <List>
                <ListItem alignItems="flex-start" sx={{justifyContent: "center", p:0, position: "relative", minHeight: "1.5em"}}>
                  {isLoading && <LoadingSpinner style={{minHeight: "0em", backgroundColor: "initial", transform: "scale(.5)", opacity: .75, position: "absolute", left: "35%", top: "-100%"}}/>}
                </ListItem>
                {users && users.map(item => 
                  <ListItemButton sx={{ }} key={item.id} disabled={isLoading} onClick={() => findChat(item.id)}>
                    {item.UserDatum.image ? 
                      <Image 
                        src={JSON.parse(item.UserDatum.image).url} 
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
                      <Typography variant="body1" align='left'>{item.username}</Typography>
                      <Typography variant="body2" align='left'>{item.UserDatum.firstName} {item.UserDatum.lastName}</Typography>
                    </Stack>
                  </ListItemButton>
                )}
              </List>
            </Box>
          </Fade>
        </Modal>
    </Stack>
  )
}

export default SearchUserForm