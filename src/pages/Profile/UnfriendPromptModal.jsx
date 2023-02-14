import React from 'react'
import { Typography, Modal, Divider, Stack, Box, Alert, Button } from "@mui/material"
import useFriendRedux from '../../hooks/useFriendRedux';

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


const UnfriendPromptModal = ({ open, handleClose, id }) => {
  const { isLoading, error, unfriend } = useFriendRedux();


  const handleClick = (isConfirmed) => {
    if(isConfirmed) unfriend(id)
    handleClose();
  }


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>      
        {error && <Alert severity='error'>{error}</Alert>}
        <Typography variant="h6" fontSize={17} mx={1} p={1} align="center">Are you sure you want to unfriend this user?</Typography>
        <Divider/>
        <Stack flexDirection="row" alignItems="center" justifyContent="center" mt={2} gap={3}>
          <Button variant="contained" color="error" onClick={() => handleClick(true)} disabled={isLoading}>Confirm</Button>
          <Button variant="outlined" color="secondary" onClick={() => handleClick()} disabled={isLoading}>Cancel</Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default UnfriendPromptModal