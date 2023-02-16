import { useState, useEffect } from 'react';
import { Paper, Typography, Button, Stack, ButtonBase } from "@mui/material"
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import CropIcon from '@mui/icons-material/Crop';
import ImageCropModal from './ImageCropModal';
const Input = styled('input')({
    display: 'none',
});

const UploadImageForm = ({ image, setImage, title, defaultImage, previewStyle , width, height, border, borderRadius, isImageNew=true  }) => {
  const [ imageData, setImageData ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);
  const onChangePicture = e => {
    if (e.target.files[0]) {
      setShowModal(true)
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageData(reader.result)
        setImage(reader.result)
      });
      reader.readAsDataURL(e.target.files[0]);
      }
  };
  const handleDelete = () => {
    setImageData(null)
    setImage(null)
  }
  return (
    <>
        <Paper sx={{my:2, minWidth: "320px"}} variant="transparent">
            <Typography variant="body1">{title}</Typography>

            <Stack direction="row" alignItems="center" justifyContent="center" spacing={6} my={3}>
                <ButtonBase sx={{borderRadius: "50%"}} disableRipple disableTouchRipple>
                    <img src={image ? image : defaultImage} style={previewStyle}/>
                </ButtonBase>
                <Stack spacing={1}>
                    {image && <>
                        {isImageNew && <Button variant="outlined" size="small" type="button" sx={{minWidth: "initial", textAlign: "left"}} color="secondary" onClick={() => setShowModal(true)}><CropIcon fontSize="small" sx={{mr: 1}}/> edit</Button>}
                        <Button variant="outlined" size="small" type="button" sx={{minWidth: "initial", textAlign: "left"}} color="warning" onClick={() => handleDelete()}><DeleteIcon fontSize="small" sx={{mr: 1}}/> delete</Button>
                    </>}
                    <label htmlFor="contained-button-file" style={{marginTop: "1em"}}>
                        <Input accept="image/*" id="contained-button-file" type="file" onChange={e => onChangePicture(e)}/>
                        <Button variant="outlined" component="span" size="small" type="button" sx={{py: .8}}>Choose File</Button>
                    </label>
                </Stack>
            </Stack>
        </Paper>
        <ImageCropModal 
          openModal={showModal} 
          image={image} 
          handleClose={() => setShowModal(false)} 
          setImage={setImage} 
          imageData={imageData} 
          setImageData={setImageData} 
          setShowModal={setShowModal}
          width={width}
          height={height}
          border={border}
          borderRadius={borderRadius}
          />
    </>
    
  )
}

export default UploadImageForm