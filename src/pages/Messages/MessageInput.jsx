import { useState } from 'react'
import { Box, IconButton, Stack, TextField, Input, FormLabel  } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';

const MessageInput = ({ disabled, handleSubmit}) => {
  const [ input, setInput ] = useState("")

  const handleKeyDown = async (e) => {
    if(e.key === "Enter" && input.trim().length !== 0) {
        e.preventDefault();
        handleSubmit(input)
        setInput("")
    }
  }

  const handleSubmitClick = () => {
    if(input.trim().length !== 0) {
      handleSubmit(input)
      setInput("")
    }
  }

  return (
    <Stack width="100%" flexDirection="row" alignItems="center" pt={1} px={{xs: 0, md: 2}}>
      <FormLabel htmlFor="contained-button-file" sx={{cursor: "pointer", my:2, mx:1}}>
        <ImageIcon color="secondary"/>
        <Input accept="image/*" id="contained-button-file" type="file" sx={{display: "none"}}/>
      </FormLabel>
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