import { useState } from 'react'
import { Box, IconButton, Stack, TextField  } from '@mui/material'
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
    <Stack width="100%" flexDirection="row" alignItems="center" pt={1}>
      <Box p={1}>
        <IconButton color="secondary" size="small"><ImageIcon/></IconButton>
      </Box>
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
      <IconButton 
        sx={{my:2, mr:1}} 
        color="secondary"
        size="small"
        onClick={handleSubmitClick}
      >
        <SendIcon/>
      </IconButton>
    </Stack>
  )
}

export default MessageInput