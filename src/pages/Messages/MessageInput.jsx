import { useState } from 'react'
import { Box, IconButton, Stack, TextField  } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
const MessageInput = () => {
  const [ input, setInput ] = useState("");


  const handleKeyDown = async (e) => {
    if(e.key === "Enter") {
        e.preventDefault();
        console.log(input)
        setInput("")
    }
  }

  return (
    <Stack width="100%" flexDirection="row" alignItems="center" pt={1}>
      <Box p={1}>
        <IconButton color="secondary"><ImageIcon/></IconButton>
      </Box>
      <TextField 
        fullWidth 
        variant="outlined" 
        placeholder='Message' 
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{m: 2}} autoFocus size="small"
        />
    </Stack>
  )
}

export default MessageInput