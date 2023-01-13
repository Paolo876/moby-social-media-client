import React, { useState, useRef } from 'react'
import { Modal, Box, Typography, Paper } from '@mui/material'
import AvatarEditor from 'react-avatar-editor'
import InputSlider from './InputSlider';
import CropIcon from '@mui/icons-material/Crop';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
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
  const [ scale, setScale ] = useState(1);
  const [ rotate, setRotate ] = useState(0);
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
          image={imageData}
          width={250}
          height={250}
          border={50}
          borderRadius={125}
          color={[0, 0, 0, .85]} // RGBA
          backgroundColor="rgb(0,0,0)"
          scale={scale}
          rotate={rotate}
          
        />
        <Box>
          <InputSlider icon={<CropIcon/>} min={1} max={3} value={scale} setValue={setScale} step={.1}/>
          <InputSlider icon={<RotateLeftIcon/>} min={-180} max={180} value={rotate} setValue={setRotate} step={10}/>
        </Box>
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