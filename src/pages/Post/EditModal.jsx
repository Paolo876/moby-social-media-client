import { useState, useEffect } from 'react'
import { Box, Paper, Tooltip, Typography, Button, useTheme, Modal, Divider, Stack, Alert } from '@mui/material';
import usePostActions from '../../hooks/usePostActions';

const EditModal = ({ open, handleClose, postId }) => {
    const { isLoading, error, authorizePost } = usePostActions();
    const [ post, setPost ] = useState(null);

    useEffect(() => {
        authorizePost(postId).then(data => console.log(data))
    }, [])

    
    const handleClick = (isConfirmed) => {
      if(isConfirmed){

      }
      handleClose();
    }
    return (
        <Modal open={open} >
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
              <Button variant="contained" color="primary" onClick={() => handleClick(true)} disabled={isLoading}>Save Changes</Button>
              <Button variant="outlined" color="secondary" onClick={() => handleClick()} disabled={isLoading}>Cancel</Button>
            </Stack>
          </Box>
        </Modal>)
}

export default EditModal