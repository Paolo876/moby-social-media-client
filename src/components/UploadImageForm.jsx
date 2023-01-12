import { useState } from 'react';
import { Paper, Typography, Button, Stack, ButtonBase } from "@mui/material"
import { styled } from '@mui/material/styles';
import defaultAvatar from "../assets/default-profile.png";
import DeleteIcon from '@mui/icons-material/Delete';
import CropIcon from '@mui/icons-material/Crop';
import ImageCropModal from './ImageCropModal';
const Input = styled('input')({
    display: 'none',
});

const UploadImageForm = ({ image, setImage, title }) => {
  const [ imageData, setImageData ] = useState(null);
//   const [ imageFile, setImageFile ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);

  const onChangePicture = e => {
    if (e.target.files[0]) {
    //   setImageFile(URL.createObjectURL(e.target.files[0]))
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageData(reader.result));
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
                <ButtonBase sx={{borderRadius: "50%"}}>
                    <img src={imageData ? imageData : defaultAvatar} style={{maxHeight: "100px", maxWidth: "100px", borderRadius: "50%"}}/>
                </ButtonBase>
                <Stack spacing={1}>
                    {imageData && <>
                        <Button variant="outlined" size="small" type="button" sx={{minWidth: "initial", textAlign: "left"}} color="secondary" onClick={() => setShowModal(true)}><CropIcon fontSize="small" sx={{mr: 1}}/> edit</Button>
                        <Button variant="outlined" size="small" type="button" sx={{minWidth: "initial", textAlign: "left"}} color="warning" onClick={() => handleDelete()}><DeleteIcon fontSize="small" sx={{mr: 1}}/> delete</Button>
                    </>}
                    <label htmlFor="contained-button-file" style={{marginTop: "1em"}}>
                        <Input accept="image/*" id="contained-button-file" type="file" onChange={e => onChangePicture(e)}/>
                        <Button variant="outlined" component="span" size="small" type="button" sx={{py: .8}}>Choose File</Button>
                    </label>
                </Stack>
            </Stack>
        </Paper>
        <ImageCropModal openModal={showModal} handleClose={() => setShowModal(false)} image={image} setImage={setImage} imageData={imageData} setImageData={setImageData}/>
    </>
    
  )
}

export default UploadImageForm