import React, { useState, useRef } from 'react'
import { Modal, Box, Typography } from '@mui/material'
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop, } from 'react-image-crop'

const ImageCropModal = ({ openModal, handleClose, image, setImage }) => {
  return (
    <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
        </Box>
    </Modal>
  )
}

export default ImageCropModal