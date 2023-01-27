import React from 'react'
import { Typography, Divider, Paper, Stack, Tooltip, IconButton, AvatarGroup, Avatar, Modal } from '@mui/material';

const LikersModal = ({ showModal, setShowModal, likes }) => {
  return (
    <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Paper sx={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: 300,
            boxShadow: 10,
            p: 4,
            }}>
            <Typography variant="h6" sx={{mx:1}}>Liked by: </Typography>
            <Divider/>
            
        </Paper>
    </Modal>
  )
}

export default LikersModal