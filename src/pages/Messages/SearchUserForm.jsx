import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthRedux from '../../hooks/useAuthRedux';
import useChatRedux from '../../hooks/useChatRedux';
import useMessagesActions from '../../hooks/useMessagesActions';
import { Typography, Stack, Tooltip, Button, Box, Modal, TextField, List, ListItemButton, ListItem, Fade, Alert, Divider, IconButton, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LoadingSpinner from "../../components/LoadingSpinner"
import defaultAvatar from "../../assets/default-profile.png"
import Image from '../../components/Image';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InventoryIcon from '@mui/icons-material/Inventory';


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
  const [ showModal, setShowModal ] = useState(false);

  return (
    <Stack flexDirection="row" alignItems="center" justifyContent="center">
        <Box backgroundColor="rgba(0,0,0,0.1)" borderRadius={4}  sx={{flex:1, height: "100%", mx: 2, my: 1}} >
            <Typography variant="h6" fontSize={16} align="center">{user.username}</Typography>
        </Box>
        <Tooltip title="Write a new message" arrow>
            <Button color="secondary" size="small" variant="contained" sx={{minWidth: 0, mr: 1}} onClick={() => setShowModal(true)}><EditIcon fontSize='small'/></Button>
        </Tooltip>
        <Divider orientation="vertical" flexItem sx={{ml:.5}}/>
        {/* dropdown */}
        <DropDownButton/>
        {/* modal */}
        <SearchModal showModal={showModal} setShowModal={setShowModal}/>
    </Stack>
  )
}


const DropDownButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const anchorRef = useRef(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'messages-navigation-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{borderRadius: "0"}}
        color="info"
        variant="outlined"
        edge={false}
        ref={anchorRef}
      >
        <ArrowDropDownIcon sx={{height: "100%"}}/>
      </IconButton>
      <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          sx={{zIndex: 10}}
        >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
              placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper elevation={3}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  <MenuItem onClick={handleClose}><InventoryIcon fontSize="inherit" color="info" sx={{mr: 1}}/> Archived Chats</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}



const SearchModal = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  const { setNewChatUser } = useChatRedux();
  const { findChat, isLoading, error, searchUser } = useMessagesActions();

  const [ input, setInput ] = useState("")
  const [ inputResponse, setInputResponse ] = useState("");
  const [ users, setUsers ] = useState(null);


  useEffect(() => {
    let timeout;
    if(input.trim().length === 0) {
      setUsers(null)
    };
    if(input.trim().length !== 0 && inputResponse.toLowerCase() !== input.toLowerCase()){
      timeout = setTimeout(() => {
        setInputResponse(input)
        searchUser(input).then( data => setUsers(data))
      }, 500);
    
    }
    return () => clearTimeout(timeout)
  }, [input]);


  const handleCloseModal = () => {
    setShowModal(false)
    setInput("")
    setInputResponse("")
    setUsers(null)
  }


  const handleUserItemClick = async (id) => {
    const result = await findChat(id);
      if(result.ChatRoomId){
        navigate(`/messages/${result.ChatRoomId}`)
      } else {
        const user = users.find(item => item.id === id);
        setNewChatUser(user)
        navigate(`/messages/new/${id}`)
      }
      handleCloseModal()
  }
  return (
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
          {error && <Alert severity='error'>{error}</Alert>}
          <TextField 
            id="standard-basic" 
            label="Search user" 
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
              <ListItemButton sx={{ }} key={item.id} disabled={isLoading} onClick={() => handleUserItemClick(item.id)}>
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
  )
}

export default SearchUserForm