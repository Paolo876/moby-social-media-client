import { useState } from 'react'
import { Box, Tooltip, IconButton, Menu, MenuItem, ListItemIcon, Divider, Modal, Fade, Typography, Stack, Button } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArchiveIcon from '@mui/icons-material/Archive';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';


const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 300,
    borderRadius: 1,
    bgcolor: 'background.paper',
    boxShadow: 10,
    px: 3,
    py: 5
  };


const ChatActionsButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [ showModal, setShowModal ] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleArchiveClick = () => {
    //
    handleClose();
  }
  
  const handleLeaveChatClick = () => {
    //
    setShowModal(true)
    handleClose();
  }

  return (
    <Box sx={{ml: "auto"}}>
        <Tooltip title="Chat Actions" arrow>
            <IconButton color="primary" onClick={handleClick}><MoreVertIcon/></IconButton>
        </Tooltip>

        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
        <Tooltip title="Archived chat rooms are placed on the archive chat folder. Notifications from this chat room will be disabled." enterDelay={400} arrow placement="left">
            <MenuItem onClick={handleArchiveClick}>
            <ListItemIcon>
                <ArchiveIcon fontSize="small" color="warning"/>
            </ListItemIcon>
            Archive Chat
            </MenuItem>
        </Tooltip>
        <Divider/>
        <MenuItem onClick={handleLeaveChatClick}>
          <ListItemIcon>
            <GroupRemoveIcon fontSize="small"  color="error"/>
          </ListItemIcon>
          Leave Chat Room
        </MenuItem>
      </Menu>

      <Modal
          open={showModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          onClose={() => setShowModal(false)}
          closeAfterTransition
        >
          <Fade in={showModal}>

            <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" m={2}>Are you sure you want to leave this chat room?</Typography>
                <Divider/>
                <Stack flexDirection="row" alignItems="center" justifyContent="center" my={3}>
                    <Button variant="contained" color="error" sx={{mx:.75}}><GroupRemoveIcon fontSize="inherit" color="light" sx={{mr:1}}/> Leave</Button>
                    <Button variant="outlined" color="secondary" sx={{mx:.75}}>Cancel</Button>
                </Stack>
            </Box>
          </Fade>
        </Modal>
    </Box>
    
  )
}

export default ChatActionsButton