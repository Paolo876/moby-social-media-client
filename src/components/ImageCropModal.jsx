import React, { useState, useRef } from 'react'
import { Modal, Box, Typography, Paper } from '@mui/material'
import AvatarEditor from 'react-avatar-editor'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4,
};

const ImageCropModal = ({ openModal, handleClose, setImage, imageData, setImageData }) => {
  const editor = useRef(null);
  return (
    <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Paper sx={style}>
        <AvatarEditor
          ref={editor}
          image="http://example.com/initialimage.jpg"
          width={250}
          height={250}
          border={50}
          borderRadius={125}
          color={[0, 0, 0, .75]} // RGBA
          backgroundColor="black"
          scale={1.2}
          rotate={0}
        />
        <button onClick={() => {
          if (editor) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            const canvas = editor.current.getImage()

            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
            const canvasScaled = editor.current.getImageScaledToCanvas()
          }
        }} type="button">Save</button>
        </Paper>
    </Modal>
  )
  }
export default ImageCropModal