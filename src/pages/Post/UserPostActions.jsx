import { useState } from 'react'
import { Box, Paper, Tooltip, Typography, Button, useTheme, Modal, Divider, Stack, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import usePostActions from '../../hooks/usePostActions';


const UserPostActions = () => {
  const { palette } = useTheme();
  const [ showDeleteModal, setShowDeleteModal ] = useState(false);
  return (
    <Paper sx={{px:1, py:1.25, borderColor: palette.secondary.light }} variant="outlined">
      <Tooltip title="These actions are only available for the post's author." arrow  placement="left-start">
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Typography variant="h6" fontSize={16}>Post Settings:</Typography>
          <Box justifyContent="right" display="flex" gap={2}>
            <Button variant="contained" disableElevation color="secondary" size="small" startIcon={<EditIcon/>}>Edit Post</Button>
            <Button variant="outlined" color="error" size="small" startIcon={<DeleteIcon/>} onClick={() => setShowDeleteModal(true)}>Delete Post</Button>
          </Box>
        </Box>
      </Tooltip>
      <DeletePromptModal open={showDeleteModal} handleClose={() => setShowDeleteModal(false)}/>
    </Paper>
  )
}

const DeletePromptModal = ({ open, handleClose }) => {
  const { isLoading, error } = usePostActions();

  const handleClick = (isConfirmed) => {
    if(isConfirmed){

    }
    handleClose()
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <Box 
        sx={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          p: 4
        }}
      >
        {error && <Alert severity='error'>{error}</Alert>}
        <Typography variant="h6" fontSize={17} mx={1} p={1} align="center">Are you sure you want to delete this post?</Typography>
        <Divider/>
        <Stack flexDirection="row" alignItems="center" justifyContent="center" mt={2} gap={3}>
          <Button variant="contained" color="error" onClick={() => handleClick(true)} disabled={isLoading}>Confirm</Button>
          <Button variant="outlined" color="secondary" onClick={() => handleClick()} disabled={isLoading}>Cancel</Button>
        </Stack>
      </Box>
    </Modal>)
}

export default UserPostActions