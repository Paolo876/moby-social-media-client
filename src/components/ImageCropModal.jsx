import React, { useState, useRef } from 'react'
import { Modal, Stack, Button, Paper } from '@mui/material'
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

const ImageCropModal = ({ openModal, handleClose, setImage, imageData, setImageData, setShowModal, image }) => {
  const editor = useRef(null);
  const [ scale, setScale ] = useState(1);
  const [ rotate, setRotate ] = useState(0);
  const [ position, setPosition ] = useState({x: .5, y: .5})

  const handleClick = () => {
    if (editor) {
      const canvasScaled = editor.current.getImageScaledToCanvas().toDataURL()
      setImage(canvasScaled)
      setShowModal(false)
    }
  }
  return (
    <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Paper sx={style}>
        <Stack alignItems="center" justifyContent="center" >
          <AvatarEditor
            ref={editor}
            image={imageData}
            width={250}
            height={250}
            border={20}
            borderRadius={125}
            color={[0, 0, 0, .9]} // RGBA
            backgroundColor="rgb(0,0,0)"
            scale={scale}
            rotate={rotate}
          />
        </Stack>
        <Stack direction="column" alignItems="center" justifyContent="center" spacing={1.5} my={2}>
          <InputSlider icon={<CropIcon sx={{mr: 1}} color="secondary"/>} min={1} max={3} value={scale} setValue={setScale} step={.1}/>
          <InputSlider icon={<RotateLeftIcon sx={{mr: 1}} color="secondary"/>} min={-180} max={180} value={rotate} setValue={setRotate} step={10}/>
        </Stack>
        <Stack mt={3}>
          <Button variant="outlined" onClick={handleClick} type="button">Save changes</Button>
        </Stack>
      </Paper>
    </Modal>
  )
  }
export default ImageCropModal