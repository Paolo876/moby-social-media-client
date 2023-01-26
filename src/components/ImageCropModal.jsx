import React, { useState, useRef } from 'react'
import { Modal, Stack, Button, Paper } from '@mui/material'
import AvatarEditor from 'react-avatar-editor'
import InputSlider from './InputSlider';
import CropIcon from '@mui/icons-material/Crop';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const ImageCropModal = ({ openModal, handleClose, setImage, imageData, setShowModal, width, height, border, borderRadius }) => {
  const editor = useRef(null);
  const [ scale, setScale ] = useState(1);
  const [ rotate, setRotate ] = useState(360);

  const handleClick = () => {
    if (editor) {
      const canvasScaled = editor.current.getImageScaledToCanvas().toDataURL("image/jpeg")
      setImage(canvasScaled)
      setShowModal(false)
    }
  }
  return (
    <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Paper sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: width + 100,
          boxShadow: 24,
          p: 4,
        }}>
        <Stack alignItems="center" justifyContent="center">
          <AvatarEditor
            ref={editor}
            image={imageData}
            width={width}
            height={height}
            border={border}
            borderRadius={borderRadius}
            color={[0, 0, 0, .9]} // RGBA
            backgroundColor="rgb(0,0,0)"
            scale={scale}
            rotate={rotate}
            crossOrigin="use-credentials"
            disableHiDPIScaling={true}
            
          />

        </Stack>
        <Stack direction="column" alignItems="center" justifyContent="center" spacing={1.5} my={2}>
          <InputSlider icon={<CropIcon sx={{mr: 1}} color="secondary"/>} min={1} max={3} value={scale} setValue={setScale} step={.05}/>
          <InputSlider icon={<RotateLeftIcon sx={{mr: 1}} color="secondary"/>} min={0} max={360} value={rotate} setValue={setRotate} step={2}/>
        </Stack>
        <Stack mt={3}>
          <Button variant="outlined" onClick={handleClick} type="button">Save changes</Button>
        </Stack>
      </Paper>
    </Modal>
  )
  }
export default ImageCropModal