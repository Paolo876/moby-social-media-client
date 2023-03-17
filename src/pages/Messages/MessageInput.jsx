import { useState } from 'react'
import { Box, IconButton, Stack, TextField, Input, FormLabel  } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

const MessageInput = ({ disabled, handleSubmit, image, setImage}) => {
  const [ input, setInput ] = useState("")

  const handleKeyDown = async (e) => {
    if(e.key === "Enter" && input.trim().length !== 0) {
        e.preventDefault();
        handleSubmit(input)
        setInput("")
    }
  }

  const handleSubmitClick = () => {
    if(input.trim().length !== 0 || image) {
      handleSubmit(input)
      setInput("")
    }
  }

  const onChangePicture = e => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImage(reader.result)
      });
      reader.readAsDataURL(e.target.files[0]);
      }
  };

  const handleDeleteImage = () => {
    setImage(null)
  }

  return (
    <Stack width="100%" flexDirection="row" alignItems="center" pt={1} px={{xs: 0, md: 2}}>
      {!image && <FormLabel htmlFor="contained-button-file" sx={{cursor: "pointer", my:2, mx:1}}>
        <ImageIcon color="secondary"/>
        <Input accept="image/*" id="contained-button-file" type="file" sx={{display: "none"}} onChange={e => onChangePicture(e)}/>
      </FormLabel>}
      {image && <Box sx={{border: "2px solid black", p: .2, my:.5, mx:1, position: "relative"}}>
        <img src={image} style={{maxHeight: "200px", maxWidth: "150px"}}/>
        <IconButton 
          size="small" 
          sx={{position: "absolute", top: -12, right: -12, color: "red", p:.25}}
          onClick={handleDeleteImage}
        >
          <CancelIcon sx={{background: "rgba(255,255,255,0.85)", borderRadius: "50%"}}/>
        </IconButton>
      </Box>}
      <TextField 
        fullWidth 
        variant="outlined" 
        placeholder='Message' 
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        sx={{my:2, mx:1}} 
        size="small"
        />
      <IconButton color="secondary" size="small" onClick={handleSubmitClick}><SendIcon/></IconButton>
    </Stack>
  )
}

export default MessageInput