import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss';
import { Paper, Typography, Container, Button, Stack } from "@mui/material"
import { styled } from '@mui/material/styles';
import defaultAvatar from "../assets/default-profile.png";

const Input = styled('input')({
    display: 'none',
});

const UploadImageForm = ({ image, setImage, title }) => {
  const [ imageData, setImageData ] = useState(null);
  
  const onChangePicture = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageData(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      }
  };


  return (
    <Paper sx={{my:2, minWidth: "320px"}} variant="transparent">
        <Typography variant="body1">{title}</Typography>

        <Stack direction="row" alignItems="center" justifyContent="center" spacing={5} my={3}>

            <img src={imageData ? imageData : defaultAvatar} style={{maxHeight: "100px", maxWidth: "100px", borderRadius: "50%"}}/>

            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" type="file" onChange={e => onChangePicture(e)}/>
                <Button variant="contained" component="span" size="small" type="button">Choose File</Button>
            </label>
            <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
            </label>
        </Stack>
    </Paper>
  )
}

export default UploadImageForm